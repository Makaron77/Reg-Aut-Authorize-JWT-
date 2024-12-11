const createUserDto = model => {
	return {
		email: model.email,
		id: model.id,
		isActivated: model.isActivated,
	};
};

module.exports = createUserDto;
