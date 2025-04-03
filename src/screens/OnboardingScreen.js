import { View, Text, ImageBackground, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { fonts } from '../../constants/fonts';
import MyButton from '../components/ui/MyButton';

const OnboardingScreen = ({ navigation }) => {
	return (
		<>
			<StatusBar style='light' />
			<View className='flex-1'>
				<ImageBackground
					className='flex-1'
					resizeMode='cover'
					source={require('../../assets/images/onboarding.png')}>
					<View className='top-[28rem] items-center px-8'>
						<Image source={require('../../assets/images/logo1.png')} />
						<Text
							style={{ fontFamily: fonts.bold }}
							className='text-[50px] text-center text-white mt-10'>
							Welcome to Our Store!
						</Text>
						<Text
							style={{ fontFamily: fonts.regular }}
							className='text-sm mt-5 text-lightwhite'>
							Get your groceries in as fast as one hour.
						</Text>
						<View className='mt-10 w-full'>
							<MyButton text='Get Started' onClick={() => navigation.navigate('Onboarding2')} />
						</View>
					</View>
				</ImageBackground>
			</View>
		</>
	);
};

export default OnboardingScreen;
