// dbCheck.js
require('dotenv').config(); // Загружаем переменные окружения
const { Sequelize } = require('sequelize'); // Подключаем Sequelize

// Инициализация подключения с использованием строки из переменной окружения
const sequelize = new Sequelize(process.env.DB); // Строка подключения из .env

// Функция проверки соединения
const checkDbConnection = async () => {
	try {
		await sequelize.authenticate(); // Проверяем соединение
		console.log('Соединение с базой данных успешно установлено!');
	} catch (error) {
		console.error('Ошибка подключения к базе данных:', error.message);
		process.exit(1); // Завершаем процесс, чтобы предотвратить запуск без соединения
	}
};

// Экспортируем функцию, чтобы её можно было вызывать из других файлов
module.exports = checkDbConnection;
