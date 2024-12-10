'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
       this.hasOne(models.Token, {
					foreignKey: 'user_id',
					as: 'token', // Алиас для удобства обращения
					onDelete: 'CASCADE', // Удалить токен при удалении пользователя
					onUpdate: 'CASCADE', // Обновить `user_id`, если ID пользователя изменится
				});
    }
  }
  User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false, // Поле обязательно
				unique: true, // Значение должно быть уникальным
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false, // Поле обязательно
			},
			isActivated: {
				type: DataTypes.BOOLEAN,
				defaultValue: false, // Значение по умолчанию
			},
			activationLink: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: 'User',
		},
	);
  return User;
};