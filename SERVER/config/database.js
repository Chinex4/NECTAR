const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
	'NECTAR',
	'postgres',
	'12345',
	{
		host: 'localhost',
		port: 5432,
		dialect: 'postgres',
		logging: false,
	}
);

module.exports = sequelize;
