const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 5000;

sequelize
	.authenticate()
	.then(() => console.log('Database connected'))
	.catch((err) => console.log('Error: ' + err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
