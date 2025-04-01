import { View, Text, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { fonts } from '../constants/fonts';
import MyButton from '../components/ui/MyButton';
import UpNavigation from '../components/ui/UpNavigation';

const OnboardingScreen2 = ({ navigation }) => {
	return (
		<>
			<StatusBar style='dark' />
			<View className='flex-1 bg-[#fcfcfc]'>
				<ImageBackground
					className='flex-1'
					source={require('../../assets/images/blurry.png')}>
					<UpNavigation />
					<Image source={require('../../assets/images/img1.png')} />
					<View className='px-6'>
						<Text
							style={{ fontFamily: fonts.bold }}
							className='text-[50px] text-center mt-10'>
							Get your Groceries with nectar!
						</Text>
						<View className='mt-10'>
							<MyButton
								onClick={() => navigation.navigate('Signup')}
								text={'Sign up'}
								className=''
							/>
							<MyButton
								onClick={() => navigation.navigate('Login')}
								text={'Log in'}
								className='mt-10'
							/>
						</View>
					</View>
				</ImageBackground>
			</View>
		</>
	);
};

export default OnboardingScreen2;
