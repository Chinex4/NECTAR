import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../constants/fonts';

const HelpScreen = ({ navigation }) => {
	return (
		<ScrollView className='flex-1 bg-white p-4'>
			<Text style={{ fontFamily: fonts.regular }} className='text-2xl font-bold mb-4'>Help & Support</Text>
			<Text style={{ fontFamily: fonts.regular }} className='text-gray-600 mb-6'>
				Find answers to common questions.
			</Text>

			<Pressable className='bg-gray-100 p-4 rounded-lg mb-2'>
				<Text style={{ fontFamily: fonts.regular }} className='text-lg font-semibold'>How do I track my order?</Text>
			</Pressable>
			<Pressable className='bg-gray-100 p-4 rounded-lg mb-2'>
				<Text style={{ fontFamily: fonts.regular }} className='text-lg font-semibold'>
					How do I change my delivery address?
				</Text>
			</Pressable>
			<Pressable className='bg-gray-100 p-4 rounded-lg mb-2'>
				<Text style={{ fontFamily: fonts.regular }} className='text-lg font-semibold'>
					What payment methods do you accept?
				</Text>
			</Pressable>

			<Pressable className='mt-6 bg-primary p-4 rounded-lg items-center'>
				<Text style={{ fontFamily: fonts.regular }} className='text-white text-lg font-bold'>Contact Support</Text>
			</Pressable>
		</ScrollView>
	);
};

const AboutScreen = () => {
	return (
		<View className='flex-1 bg-white p-4'>
			<Text style={{ fontFamily: fonts.regular }} className='text-gray-600 mb-4'>
				This app is designed to provide the best shopping experience.
			</Text>

			<View className='mb-4'>
				<Text style={{ fontFamily: fonts.regular }} className='text-lg font-semibold'>App Version</Text>
				<Text style={{ fontFamily: fonts.regular }} className='text-gray-500'>1.0.0</Text>
			</View>

			<View className='mb-4'>
				<Text style={{ fontFamily: fonts.regular }} className='text-lg font-semibold'>Company</Text>
				<Text style={{ fontFamily: fonts.regular }} className='text-gray-500'>Chinex Tech Solutions</Text>
			</View>

			<Pressable className='mt-4 bg-gray-100 p-4 rounded-lg'>
				<Text style={{ fontFamily: fonts.regular }} className='text-lg font-semibold text-center text-primary'>
					Visit our Website
				</Text>
			</Pressable>
		</View>
	);
};

export { HelpScreen, AboutScreen };
