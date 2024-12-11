const userService = require('../service/userService'); // Импорт сервиса для работы с бизнес-логикой пользователей
const { validationResult } = require('express-validator'); // Импорт функции для проверки данных запроса
const ApiError = require('../exceptions/apiError'); // Кастомный класс для обработки ошибок

//! Контроллер для регистрации пользователя
exports.registration = async (req, res, next) => {
	try {
		// Проверка валидации данных запроса
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Если есть ошибки валидации
			return next(
				ApiError.BadRequest('Ошибка при валидации', errors.array()), // Вызывается next() с ошибкой для передачи в middleware обработки ошибок
			);
		}

		// Извлечение email и password из тела запроса
		const { email, password } = req.body;

		// Регистрация нового пользователя через сервисный слой
		const userData = await userService.registrationService(email, password);

		// Установка куки с refresh-токеном
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000, // Время жизни куки: 30 дней
			httpOnly: true, // Делает куки недоступной для JavaScript в браузере
		});

		// Ответ клиенту с данными о пользователе и токенами
		return res.json(userData);
	} catch (err) {
		next(err); // Передача ошибки в middleware обработки ошибок
	}
};

//! Контроллер для авторизации (логина) пользователя
exports.login = async (req, res, next) => {
	try {
		// Извлечение email и password из тела запроса
		const { email, password } = req.body;

		// Авторизация пользователя через сервисный слой
		const userData = await userService.loginService(email, password);

		// Установка куки с refresh-токеном
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000, // Время жизни куки: 30 дней
			httpOnly: true, // Делает куки недоступной для JavaScript
			//!secure:true, (если исп протокол https)
		});

		// Ответ клиенту с данными о пользователе и токенами
		return res.json(userData);
	} catch (err) {
		next(err); // Передача ошибки в middleware обработки ошибок
	}
};

//! Контроллер для выхода пользователя
exports.logout = async (req, res, next) => {
	try {
		// Извлечение refresh-токена из куков
		const { refreshToken } = req.cookies;

		// Удаление токена через сервисный слой
		const token = await userService.logoutService(refreshToken);

		// Очистка куков
		res.clearCookie('refreshToken');

		// Ответ клиенту с подтверждением выхода
		return res.json(token);
	} catch (err) {
		next(err); // Передача ошибки в middleware обработки ошибок
	}
};

//! Контроллер для активации аккаунта
exports.activate = async (req, res, next) => {
	try {
		// Извлечение активационной ссылки из параметров запроса
		const activationLink = req.params.link;

		// Активация пользователя через сервисный слой
		await userService.activateService(activationLink);

		// Редирект на клиентское приложение
		return res.redirect(process.env.CLIENT_URL);
	} catch (err) {
		next(err); // Передача ошибки в middleware обработки ошибок
	}
};

//! Контроллер для обновления токенов (рефреш)
exports.refresh = async (req, res, next) => {
	try {
		// Извлечение refresh-токена из куков
		const { refreshToken } = req.cookies;

		// Обновление токенов через сервисный слой
		const userData = await userService.refreshService(refreshToken);

		// Установка нового refresh-токена в куки
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000, // Время жизни куки: 30 дней
			httpOnly: true, // Делает куки недоступной для JavaScript
		});

		// Ответ клиенту с данными о пользователе и токенами
		return res.json(userData);
	} catch (err) {
		next(err); // Передача ошибки в middleware обработки ошибок
	}
};

//! Контроллер для получения всех пользователей
exports.users = async (req, res, next) => {
	try {
		// Получение списка всех пользователей через сервисный слой
		const users = await userService.getAllUsersService();

		// Ответ клиенту со списком пользователей
		return res.json(users);
	} catch (err) {
		next(err); // Передача ошибки в middleware обработки ошибок
	}
};
