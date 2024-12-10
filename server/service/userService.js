//* Чтобы контроллер не был слишком толстый выносим логику в 'сервисы'
const UserModel = require('../db/models/user');
const bcrypt = require('bcrypt');


exports.registrationService = async (email, password) => {
	const candidate = await UserModel.findOne({ email })
	if (candidate) {
		throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
	}
	const hashPassword = await bcrypt.hash(password, 3)
	const user = await UserModel.create({email, password})
}