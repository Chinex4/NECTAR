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
import UpNavigation from '../../components/ui/UpNavigation';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fonts } from '../../constants/fonts';
import MyButton from '../../components/ui/MyButton';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { supabase } from '../../../supabase';

const signupSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, 'Username must be at least 3 characters')
		.required('Username is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
	confirmpassword: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = ({ navigation }) => {
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
			const { user, error } = await supabase.auth.signUp({
				email: data.email,
				password: data.password,
				options: {
					data: {
						username: data.username,
					},
				},
			});
	
			if (error) throw error;
	
			setSuccess('Signup successful! Please check your email for the OTP verification.');
			navigation.navigate('OTPVerification', { email: data.email });
	
		} catch (error) {
			setError(error.message);
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
					source={require('../../../assets/images/blurry.png')}>
					<UpNavigation />
					<View className='items-center'>
						<Image
							className='absolute top-[70px] z-10 w-10 h-12'
							source={require('../../../assets/images/logo2.png')}
						/>
					</View>
					{/* Code goes here */}
					<View style={[styles.content, { overflow: 'hidden' }]}>
						<ScrollView
							automaticallyAdjustKeyboardInsets={true}
							showsVerticalScrollIndicator={false}
							bounces={true}>
							<Text style={styles.title}>Sign Up</Text>
							<Text
								style={{ fontFamily: fonts.regular }}
								className='text-grayy'>
								Enter your credentials to continue
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
								{/* Username Input */}
								<Text
									style={{ fontFamily: fonts.semibold }}
									className='text-grayy mb-1 text-xl'>
									Username
								</Text>
								<Controller
									control={control}
									name='username'
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											className='border-b-[1px] border-[#e2e2e2] px-3 py-4 rounded-md'
											placeholder='Enter your username'
											onBlur={onBlur}
											style={{ fontFamily: fonts.regular, fontSize: 16 }}
											onChangeText={onChange}
											value={value}
										/>
									)}
								/>
								{errors.username && (
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-red-500 text-sm'>
										{errors.username.message}
									</Text>
								)}

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
								{/* Confirm Password Input */}
								<Text
									style={{ fontFamily: fonts.semibold }}
									className='text-grayy text-xl mt-4 mb-1'>
									Confirm Password
								</Text>
								<View className='border-b-[1px] border-[#e2e2e2] px-3 py-2 rounded-md flex-row items-center'>
									<Controller
										control={control}
										name='confirmpassword'
										render={({ field: { onChange, onBlur, value } }) => (
											<TextInput
												className='flex-1 '
												placeholder='Enter your password '
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
								{errors.confirmpassword && (
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-red-500 text-sm'>
										{errors.confirmpassword.message}
									</Text>
								)}
							</ScrollView>

							{/* Sign Up Button */}
							<MyButton onClick={handleSubmit(onSubmit)} text={loading ? <ActivityIndicator color="#fff" /> : 'Sign Up'} className='mt-10' />

							{/* Login Redirect */}
							<Pressable android-ripple={{color: '#ccc'}} className='mb-10' onPress={() => navigation.navigate('Login')}>
								<Text
									style={{ fontFamily: fonts.regular }}
									className='text-center text-grayy mt-4'>
									Already have an account?{' '}
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-primary'>
										Sign in
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

export default Signup;

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
