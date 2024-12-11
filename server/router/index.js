const Router = require('express').Router;
const userController = require('../controllers/userController');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

router.post(
	'/registration',
	[
		body('email')
			.isEmail()
			.withMessage('Некорректный формат электронной почты'),
		body('password')
			.isLength({ min: 8, max: 32 })
			.withMessage('Пароль должен содержать от 8 до 32 символов')
			.matches(/^\S*$/)
			.withMessage('Пароль не должен содержать пробелов')
			.isStrongPassword({
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
			.withMessage(
				'Пароль должен содержать хотя бы одну строчную букву, одну заглавную, одно число и один символ',
			),
	],
	userController.registration,
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.users);

module.exports = router;
// {
//   status: 400,
//   errors: [
//     {
//       type: 'field',
//       value: 'makasika47@gmail.com12334435',
//       msg: 'Некорректный формат электронной почты',
//       path: 'email',
//       location: 'body'
//     }
//   ]
// }
