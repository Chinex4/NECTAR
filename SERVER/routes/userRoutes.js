const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { User } = require('../models'); // Import User model from Sequelize
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

// Nodemailer configuration for sending OTP emails
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER, // Your email
		pass: process.env.EMAIL_PASS, // Your email password or app password
	},
});

// Function to generate a 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

// Signup Route
router.post(
	'/signup',
	[
		body('username')
			.notEmpty()
			.withMessage('Username is required')
			.isLength({ min: 3 }),
		body('email').isEmail().withMessage('Invalid email'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success: false, errors: errors.array() });
		}

		const { username, email, password } = req.body;

		try {
			// Check if email already exists
			let userExists = await User.findOne({ where: { email } });
			if (userExists) {
				return res
					.status(400)
					.json({ success: false, message: 'Email already exists' });
			}

			// Hash password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			// Generate OTP
			const otp = generateOTP();
			const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

			// Create new user with OTP (user will be inactive until verified)
			const newUser = await User.create({
				username,
				email,
				password: hashedPassword,
				isVerified: false, // User is not verified yet
				otp,
				otpExpiresAt,
			});

			// Send OTP to user's email
			await transporter.sendMail({
				from: process.env.EMAIL_USER,
				to: email,
				subject: 'Your OTP Code',
				text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
			});

			res.status(201).json({
				success: true,
				message:
					'User registered successfully. Please verify your email with the OTP sent.',
				user: {
					id: newUser.id,
					username: newUser.username,
					email: newUser.email,
				},
			});
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ success: false, message: 'Internal Server Error' });
		}
	}
);

// OTP Verification Route
router.post('/verify-otp', async (req, res) => {
	const { email, otp } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: 'User not found' });
		}

		// Check if OTP is valid
		if (user.otp !== otp || new Date() > user.otpExpiresAt) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid or expired OTP' });
		}

		// Update user as verified
		user.isVerified = true;
		user.otp = null;
		user.otpExpiresAt = null;
		await user.save();

		// Generate JWT Token
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

		res.json({
			success: true,
			message: 'OTP verified successfully. You are now logged in.',
			token,
			user: { id: user.id, username: user.username, email: user.email },
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
});

// Login Route
router.post(
	'/login',
	[
		body('email').isEmail().withMessage('Invalid email'),
		body('password').notEmpty().withMessage('Password is required'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ success: false, errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// Check if user exists
			const user = await User.findOne({ where: { email } });

			if (!user) {
				return res
					.status(400)
					.json({ success: false, message: 'Invalid email or password' });
			}

			// Check if user is verified
			if (!user.isVerified) {
				return res
					.status(403)
					.json({
						success: false,
						message: 'Please verify your email before logging in',
					});
			}

			// Compare passwords
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(400)
					.json({ success: false, message: 'Invalid email or password' });
			}

			// Generate JWT Token
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: '7d',
			});

			res.json({
				success: true,
				message: 'Login successful',
				token,
				user: { id: user.id, username: user.username, email: user.email },
			});
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ success: false, message: 'Internal Server Error' });
		}
	}
);

module.exports = router;
