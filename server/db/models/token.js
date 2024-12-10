'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Token extends Model {
		static associate(models) {
			this.belongsTo(models.User, {
				foreignKey: 'user_id',
				as: 'user', // Алиас для удобства обращения
				onDelete: 'CASCADE', // Удалить токен при удалении пользователя
				onUpdate: 'CASCADE', // Обновить `user_id`, если ID пользователя изменится
			});
		}
	}
	Token.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false, // Поле обязательно
			},
			refreshToken: {
				type: DataTypes.STRING,
				allowNull: false, // Поле обязательно
			},
		},
		{
			sequelize,
			modelName: 'Token',
		},
	);
	return Token;
};
