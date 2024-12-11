// Подключаем библиотеки
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors'); //npm install cors - Установить!!!
require('dotenv').config(); // Подключение переменных окружения из .env
const dbCheck = require('./db/dbCheck'); // Подключаем файл для проверки соединения с БД
const router = require('./router/index')
const errorMiddleware = require('./middlewares/errorMiddleware')
// Запуск проверки соединения с базой данных
dbCheck();

const app = express();

app.use(
	cors({
		origin: 'http://localhost:5173',
	}),
);

const PORT = process.env.PORT || 3000; // Порт сервера

// Настройка промежуточного ПО
app.use(express.json()); // Для обработки JSON данных
app.use(cookieParser());// Для обработки куки
app.use(express.urlencoded({ extended: true })); // Для обработки URL-encoded данных
app.use('/api', router);
// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorMiddleware);

// Запуск сервера
app.listen(PORT, () => {
	try {
		console.log(`Сервер работает на порту ${PORT}`);
	} catch (err) {
		console.log(err, 'Ошибка запуска порта server.js');
		
	}
});
