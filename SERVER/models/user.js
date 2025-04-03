const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.UUID, // or DataTypes.INTEGER if using auto-increment
			defaultValue: DataTypes.UUIDV4, // Only for UUIDs
			primaryKey: true,
			allowNull: false,
		},

		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		password: { type: DataTypes.STRING, allowNull: false },
		otp: { type: DataTypes.STRING, allowNull: true },
		otpExpiresAt: { type: DataTypes.DATE, allowNull: true },
		isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
		selectedLocation: { type: DataTypes.STRING, allowNull: true },
		name: { type: DataTypes.STRING, allowNull: true },
		address: { type: DataTypes.TEXT, allowNull: true },
		deliveryAddresses: { type: DataTypes.JSON, allowNull: true },
		phoneNumber: { type: DataTypes.STRING, allowNull: true },
		profileImage: { type: DataTypes.STRING, allowNull: true },
	});

	return User;
};
