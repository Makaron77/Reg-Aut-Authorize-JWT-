const jwt = require('jsonwebtoken');
const { Token } = require('../db/models');
//! функция генерации access и refresh токенов
exports.generateTokens = (payload) => {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
		expiresIn: '30m', // время жизни токена можно указать часы, минуты и секунды
	}); //* acessToken вернет JWT токен(строку)
	//* Эта строка состоит из трех частей, разделенных точками (.):

  //*  - Header: Содержит информацию об алгоритме и типе токена.
  //*  - Payload: Содержит данные, которые вы передали (например, payload).
  //*  - Signature: Это подпись, созданная на основе Header, Payload и секретного ключа.
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
		expiresIn: '30d',
	});//* Так же возвращает аналогичный но другой рефреш токен, обычной другим временем жизни и секретный	 ключ отдельный берется из .env
	return {
		accessToken,
		refreshToken,
	};
};

//!Функция для валидации access token
exports.validateAccessToken = (token) => {
    try {
        //* Пытаемся расшифровать токен с использованием секретного ключа для access токенов.
        //* jwt.verify() проверяет подпись и срок действия токена.
		return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
	} catch (e) {
		//* Если токен недействителен или истек, возвращаем null
		return null;
	}
};

//! Функция для валидации refresh token
exports.validateRefreshToken = (token) => {
    try {
        //* Пытаемся расшифровать токен с использованием секретного ключа для refresh токенов.
		return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
	} catch (e) {
		//* Если токен недействителен или истек, возвращаем null
		return null;
	}
};

//! Функция для сохранения refresh токена в базе данных
exports.saveToken = async (user_id, refreshToken) => {

	//* Ищем запись с данным user_id в модели токенов
	const tokenData = await Token.findOne({ where: { user_id } });
	
	if (tokenData) {
		//* Если запись с таким user_id уже существует, обновляем refresh токен
		tokenData.refreshToken = refreshToken;
		//* Сохраняем обновленную запись в базе данных
		return tokenData.save();
	}

	//* Если записи с таким user_id нет, создаем новую запись в базе данных с user_id и refreshToken
	return Token.create({ user_id, refreshToken });
};

//! Функция для удаления refresh токена из базы данных
exports.removeToken = async (refreshToken) => {
	//* Удаляем запись с данным refreshToken из базы данных
	return Token.destroy({ refreshToken });
};

//! Функция для нахождения записи с данным refresh токеном в базе данных
exports.findToken = async (refreshToken) => {
	//* Ищем запись с данным refreshToken в базе данных
	return Token.findOne({ refreshToken });
}

