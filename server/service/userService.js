const { User } = require('../db/models');
// Модель пользователя для взаимодействия с БД
const bcrypt = require('bcrypt'); // Для хеширования паролей
const uuid = require('uuid'); // Для генерации уникальных идентификаторов
const mailService = require('./mailService'); // Сервис для отправки писем
const tokenService = require('./tokenService'); // Сервис для работы с токенами
const createUserDto = require('../dtos/userDto'); // DTO (Data Transfer Object) для фильтрации данных пользователя
const ApiError = require('../exceptions/apiError'); // Кастомные ошибки

//! Регистрация нового пользователя
exports.registrationService = async (email, password) => {
	// Проверяем, существует ли уже пользователь с таким email
	const candidate = await User.findOne({where: { email }} );
	if (candidate) {
		// Если пользователь существует, выбрасываем ошибку
		throw ApiError.BadRequest(
			`Пользователь с почтовым адресом ${email} уже существует`,
		);
	}

	// Хешируем пароль пользователя с использованием bcrypt, уровень хеширования — 3
	const hashPassword = await bcrypt.hash(password, 3);
	// Генерируем уникальную ссылку активации для пользователя
	const activationLink = uuid.v4();

	// Создаем пользователя в БД с хешированным паролем и ссылкой активации
	const user = await User.create({
		email,
		password: hashPassword,
		activationLink,
	});

	// Отправляем письмо с активационной ссылкой на почту пользователя
	await mailService.sendActivationMail(
		email,
		`${process.env.API_URL}/api/activate/${activationLink}`,
	);

	// Создаем DTO для фильтрации чувствительных данных пользователя
	const userDto = createUserDto(user);
	// Генерируем access и refresh токены
	const tokens = tokenService.generateTokens({ ...userDto });
	// Сохраняем refresh токен в БД
	await tokenService.saveToken(userDto.id, tokens.refreshToken);

	// Возвращаем токены и данные пользователя
	return { ...tokens, user: userDto };
};

//! Активация пользователя по ссылке
exports.activateService = async (activationLink) => {
	// Ищем пользователя с соответствующей ссылкой активации
	const user = await User.findOne({ activationLink });
	if (!user) {
		// Если пользователь не найден, выбрасываем ошибку
		throw ApiError.BadRequest('Некорректная ссылка активации');
	}
	// Устанавливаем флаг isActivated в true, чтобы отметить, что пользователь активирован
	user.isActivated = true;
	// Сохраняем изменения в БД
	await user.save();
};

//! Авторизация (вход) пользователя
exports.loginService = async (email, password) => {
	// Ищем пользователя по email в БД
	const user = await User.findOne({ where: { email } });
	if (!user) {
		// Если пользователь не найден, выбрасываем ошибку
		throw ApiError.BadRequest('Пользователь с таким email не найден');
	}

	// Сравниваем введенный пароль с хешированным паролем из БД
	const isPassEquals = await bcrypt.compare(password, user.password);
	if (!isPassEquals) {
		// Если пароли не совпадают, выбрасываем ошибку
		throw ApiError.BadRequest('Неверный пароль');
	}

	// Создаем DTO для фильтрации чувствительных данных пользователя
	const userDto = createUserDto(user);
	// Генерируем access и refresh токены
	const tokens = tokenService.generateTokens({ ...userDto });
	// Сохраняем refresh токен в БД
	await tokenService.saveToken(userDto.id, tokens.refreshToken);

	// Возвращаем токены и данные пользователя
	return { ...tokens, user: userDto };
};

//! Выход из системы (удаление refresh токена)
exports.logoutService = async refreshToken => {
	// Удаляем refresh токен из БД
	return tokenService.removeToken(refreshToken);
};

//! Обновление токенов (рефреш)
exports.refreshService = async refreshToken => {
	if (!refreshToken) {
		// Если токен отсутствует, выбрасываем ошибку
		throw ApiError.UnauthorizedError();
	}

	// Валидируем refresh токен
	const userData = tokenService.validateRefreshToken(refreshToken);
	// Проверяем, есть ли такой токен в БД
	const tokenFromDb = await tokenService.findToken(refreshToken);

	if (!userData || !tokenFromDb) {
		// Если токен недействителен или не найден в БД, выбрасываем ошибку
		throw ApiError.UnauthorizedError();
	}

	// Ищем пользователя по ID, извлеченному из токена
	const user = await User.findByPk(userData.id);
	// Создаем DTO для фильтрации данных пользователя
	const userDto = createUserDto(user);
	// Генерируем новые токены
	const tokens = tokenService.generateTokens({ ...userDto });
	// Сохраняем новый refresh токен в БД
	await tokenService.saveToken(userDto.id, tokens.refreshToken);

	// Возвращаем токены и данные пользователя
	return { ...tokens, user: userDto };
};

//! Получение всех пользователей (административная функция)
exports.getAllUsersService = async () => {
	// Находим и возвращаем всех пользователей из БД
	return User.findAll();
};


