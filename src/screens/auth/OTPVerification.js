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
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fonts } from '../../constants/fonts';
import MyButton from '../../components/ui/MyButton';

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
			const { user, error } = await supabase.auth.verifyOtp({
				email,
				token: data.otp,
				type: 'signup',
			});

			if (error) throw error;

			setSuccess('Verification successful! Redirecting to login...');
			setTimeout(() => navigation.navigate('Login'), 2000);
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
										<Text style={{fontFamily: fonts.semibold}} className='text-white text-xl text-center'>Verify OTP</Text>
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
