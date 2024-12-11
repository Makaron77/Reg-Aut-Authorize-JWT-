const nodemailer = require('nodemailer'); //*библиотека для отправки писем

const createTransporter = () => {
	return nodemailer.createTransport({
		host: process.env.SMTP_HOST, // Хост SMTP сервера
		port: process.env.SMTP_PORT, // Порт SMTP сервера
		//*secure: false, // Указывает, использовать ли защищенное соединение (SSL/TLS) - https
		
		auth: {
			// Параметры для аутентификации
			user: process.env.SMTP_USER, // Пользователь SMTP
			pass: process.env.SMTP_PASSWORD, // Пароль пользователя
		},
		
	});

};


const sendActivationMail = async (to, link) => {
	const transporter = createTransporter(); // Создание транспортера для отправки почты
	await transporter.sendMail({
		from: process.env.SMTP_USER, // От кого письмо
		to, // Кому письмо (передается в аргументах функции)
		subject: 'Активация аккаунта на ' + process.env.API_URL, // Тема письма
		text: '', // Текстовое содержимое письма (здесь не используется)
		html: `    // HTML содержимое письма
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>   // Ссылка для активации аккаунта
            </div>
        `,
	});
};


module.exports = { sendActivationMail };
