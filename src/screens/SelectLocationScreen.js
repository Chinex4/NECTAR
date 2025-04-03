import {
	View,
	Text,
	ImageBackground,
	Pressable,
	TextInput,
	StyleSheet,
	Image,
	ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import UpNavigation from '../components/UpNavigation';
import { fonts } from '../../constants/fonts';
import MyButton from '../components/ui/MyButton';
import { Picker } from '@react-native-picker/picker';

const SelectLocationScreen = ({ navigation }) => {
	const [selectedZone, setSelectedZone] = useState('Banasree');
	const [selectedArea, setSelectedArea] = useState('');

	const onSubmit = () => {
		navigation.navigate('Home');
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
							<View className='items-center'>
							    <Image
    								className='mt-4'
    								source={require('../../assets/images/map.png')}
    							/>
							</View>
							{/* Title & Subtitle */}
							<Text
								className='text-4xl text-black text-center mt-6'
								style={{ fontFamily: fonts.bold }}>
								Select Your Location
							</Text>
							<Text
								className='text-gray-500 text-center mt-1'
								style={{ fontFamily: fonts.regular }}>
								Switch on your location to stay in tune with what's happening in
								your area
							</Text>

							{/* Dropdown Selectors */}
							<View className='mt-12'>
								<Text
									className='text-black mb-2 text-lg'
									style={{ fontFamily: fonts.semibold }}>
									Your City
								</Text>
								<View className='border border-gray-300 rounded-lg'>
									<Picker
                                        style={{ fontFamily: fonts.regular }}
										selectedValue={selectedZone}
										onValueChange={(itemValue) => setSelectedZone(itemValue)}>

										<Picker.Item
											label='Abraka'
											value='Abraka'
										/>
										<Picker.Item
											label='Asaba'
											value='Asaba'
										/>
										<Picker.Item
											label='Obiaruku'
											value='Obiarulu'
										/>
									</Picker>
								</View>
							</View>

							<View className='mt-4'>
								<Text
									className='text-black mb-2 text-lg'
									style={{ fontFamily: fonts.semibold }}>
									Your Area
								</Text>
								<View className='border border-gray-300 rounded-lg'>
									<Picker
										selectedValue={selectedArea}
										onValueChange={(itemValue) => setSelectedArea(itemValue)}>
										<Picker.Item
											label='Types of your area'
											value=''
										/>
										<Picker.Item
											label='Olori 19'
											value='Olori 19'
										/>
										<Picker.Item
											label='Lucas'
											value='Lucas'
										/>
									</Picker>
								</View>
							</View>

							{/* Submit Button */}
							<MyButton text={'Submit'} className='mt-[5rem]'/>
						</ScrollView>
					</View>
				</ImageBackground>
			</View>
		</>
	);
};

export default SelectLocationScreen;

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
