const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ username, email, password: hashedPassword });

		res.status(201).json({ message: 'User created successfully', user });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		res.json({ message: 'Login successful', token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
