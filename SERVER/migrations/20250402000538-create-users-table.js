'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.fn('gen_random_uuid'), // Use uuid_generate_v4 if needed
				allowNull: false,
				primaryKey: true,
			},
			username: {
				type: Sequelize.STRING(50),
				allowNull: false,
				unique: true,
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(100),
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			otp: {
				type: Sequelize.STRING(10),
				allowNull: true,
			},
			otpExpiresAt: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			isVerified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			phoneNumber: {
				type: Sequelize.STRING(20),
				allowNull: true,
			},
			address: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			deliveryAddresses: {
				type: Sequelize.JSONB,
				allowNull: true,
				defaultValue: [],
			},
			profileImage: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Users');
	},
};
