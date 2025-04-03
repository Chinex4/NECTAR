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
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fonts } from '../../constants/fonts';
import MyButton from '../components/ui/MyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const otpSchema = Yup.object().shape({
	otp: Yup.number()
		.min(4, 'OTP code is a 4-digit number')
		.required('OTP is required'),
});

const OTPVerification = ({ navigation, route }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(otpSchema),
	});

	const { email } = route.params;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const verifyOtp = async (data) => {
		setLoading(true);
		setError('');
		setSuccess('');

		try {
			// Send OTP to the backend for verification
			const response = await axios.post('http://192.168.41.134:5000/api/auth/verify-otp', {
				email,
				otp: data.otp,
			});
			console.log(response)

			if (response.data.success && response.data.token) {
				// Successfully verified OTP and got the token
				const { token, user } = response.data;

				// Store the token (for future requests and to keep the user logged in)
				await AsyncStorage.setItem('userToken', token);

				// Optionally, you can store user data here as well (for easier access)
				setSuccess('Verification successful! Redirecting to home...');

				// Navigate to the Home screen with user data
				setTimeout(() => navigation.replace('Home', { user }), 2000);
			}
		} catch (error) {
			setError(error.response?.data?.message || 'An error occurred');
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
					{/* Code goes here */}
					<View style={[styles.content, { overflow: 'hidden' }]}>
						<ScrollView
							automaticallyAdjustKeyboardInsets={true}
							showsVerticalScrollIndicator={false}
							bounces={true}>
							<Text style={styles.title}>Enter your 4-digit code</Text>
							<Text
								style={{ fontFamily: fonts.regular }}
								className='text-grayy'>
								Enter the 4-digit code sent to {email}
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

							<ScrollView className='mt-5'>
								{/* Email Input */}
								<Text
									style={{ fontFamily: fonts.semibold }}
									className='text-grayy mt-4 text-xl mb-1'>
									Code
								</Text>
								<Controller
									control={control}
									name='otp'
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											className='border-b-[1px] border-[#e2e2e2] px-3 py-4 rounded-md'
											placeholder='----'
											keyboardType='numeric'
											maxLength={4}
											onBlur={onBlur}
											style={{ fontFamily: fonts.regular, fontSize: 16 }}
											onChangeText={onChange}
											value={value}
										/>
									)}
								/>
								{errors.otp && (
									<Text
										style={{ fontFamily: fonts.semibold }}
										className='text-red-500 text-sm'>
										{errors.otp.message}
									</Text>
								)}

								<Pressable
									android-ripple={{ color: '#ccc' }}
									className='items-center'>
									<Text
										className='mt-8 text-primary'
										style={{ fontFamily: fonts.semibold, fontSize: 16 }}>
										Resend Code
									</Text>
								</Pressable>

								<Pressable
									className='bg-primary px-6 py-4 rounded-lg mt-[25rem]'
									onPress={handleSubmit(verifyOtp)}
									disabled={loading}>
									{loading ? (
										<ActivityIndicator color='#fff' />
									) : (
										<Text
											style={{ fontFamily: fonts.semibold }}
											className='text-white text-xl text-center'>
											Verify OTP
										</Text>
									)}
								</Pressable>
							</ScrollView>
						</ScrollView>
					</View>
				</ImageBackground>
			</View>
		</>
	);
};

export default OTPVerification;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 24,
		marginTop: 130,
	},
	title: {
		fontSize: 34,
		fontFamily: fonts.bold,
		marginBottom: 5,
	},
});
