import {
	View,
	Text,
	ImageBackground,
	Pressable,
	TextInput,
	StyleSheet,
	Image,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import UpNavigation from '../components/UpNavigation';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fonts } from '../../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const signupSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
});

const Login = ({ navigation }) => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(signupSchema),
	});

	const onSubmit = async (data) => {
		setLoading(true);
		setError('');
		setSuccess('');

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			const user = userCredential.user;

			setSuccess('Login successful! Redirecting...');
			await AsyncStorage.setItem('authToken', user.accessToken);

			// Navigate to the Home screen
			navigation.navigate('Home', { user });
		} catch (error) {
			setError(error.message || 'Something went wrong!');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<StatusBar style='dark' />
			<View className='flex-1 bg-[#fcfcfc]'>
				<ImageBackground
					className='flex-1'
					source={require('../../assets/images/blurry.png')}>
					<UpNavigation />
					<View className='items-center'>
						<Image
							className='absolute top-[70px] z-10 w-10 h-12'
							source={require('../../assets/images/logo2.png')}
						/>
					</View>
					{/* Code goes here */}
					<View style={[styles.content, { overflow: 'hidden' }]}>
						<ScrollView
							automaticallyAdjustKeyboardInsets={true}
							showsVerticalScrollIndicator={false}
							bounces={true}>
							<Text style={styles.title}>Log in</Text>
							<Text
								style={{ fontFamily: fonts.regular }}
								className='text-grayy'>
								Enter your email and password
							</Text>

							{error ? (
								<View className='mt-5'>
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-red-500 text-xl'>
										{error}
									</Text>
								</View>
							) : null}
							{success ? (
								<View className='mt-5'>
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-green-500 text-xl'>
										{success}
									</Text>
								</View>
							) : null}

							<ScrollView className='mt-12'>
								{/* Email Input */}
								<Text
									style={{ fontFamily: fonts.semibold }}
									className='text-grayy mt-4 text-xl mb-1'>
									Email
								</Text>
								<Controller
									control={control}
									name='email'
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											className='border-b-[1px] border-[#e2e2e2] px-3 py-4 rounded-md'
											placeholder='Enter your email'
											keyboardType='email-address'
											onBlur={onBlur}
											style={{ fontFamily: fonts.regular, fontSize: 16 }}
											onChangeText={onChange}
											value={value}
										/>
									)}
								/>
								{errors.email && (
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-red-500 text-sm'>
										{errors.email.message}
									</Text>
								)}

								{/* Password Input */}
								<Text
									style={{ fontFamily: fonts.semibold }}
									className='text-grayy text-xl mt-4 mb-1'>
									Password
								</Text>
								<View className='border-b-[1px] border-[#e2e2e2] px-3 py-2 rounded-md flex-row items-center'>
									<Controller
										control={control}
										name='password'
										render={({ field: { onChange, onBlur, value } }) => (
											<TextInput
												className='flex-1 '
												placeholder='Enter your password'
												secureTextEntry={!passwordVisible}
												onBlur={onBlur}
												style={{ fontFamily: fonts.regular, fontSize: 16 }}
												onChangeText={onChange}
												value={value}
											/>
										)}
									/>
									<Pressable
										onPress={() => setPasswordVisible(!passwordVisible)}>
										<Ionicons
											name={passwordVisible ? 'eye' : 'eye-off'}
											size={20}
											color='gray'
										/>
									</Pressable>
								</View>
								{errors.password && (
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-red-500 text-sm'>
										{errors.password.message}
									</Text>
								)}
								{/* Forgot Password */}
								<View className='items-end mt-4'>
									<Pressable
										className='mb-10'
										onPress={() => navigation.navigate('ForgotPassword')}>
										<Text style={{ fontFamily: fonts.regular }}>
											Forgot Password?
										</Text>
									</Pressable>
								</View>
							</ScrollView>

							{/* Sign Up Button */}
							<Pressable
								className='bg-primary px-6 py-4 rounded-lg mt-10'
								android_ripple={{ color: '#ccc' }}
								onPress={handleSubmit(onSubmit)}
								disabled={loading}>
								{loading ? (
									<ActivityIndicator color='#fff' />
								) : (
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-white text-xl text-center'>
										Login
									</Text>
								)}
							</Pressable>

							{/* Login Redirect */}
							<Pressable
								className='mb-10'
								onPress={() => navigation.navigate('Signup')}>
								<Text
									style={{ fontFamily: fonts.regular }}
									className='text-center text-grayy mt-4'>
									Don't have and account?{' '}
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-primary'>
										Sign up
									</Text>
								</Text>
							</Pressable>
						</ScrollView>
					</View>
				</ImageBackground>
			</View>
		</>
	);
};

export default Login;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 24,
		marginTop: 170,
	},
	title: {
		fontSize: 34,
		fontFamily: fonts.bold,
		marginBottom: 5,
	},
});
