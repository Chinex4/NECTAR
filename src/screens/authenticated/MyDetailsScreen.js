import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../constants/fonts';

const MyDetailsScreen = () => {
	const [name, setName] = useState('Afsar Hossen');
	const [email, setEmail] = useState('lmshuvo97@gmail.com');
	const [phone, setPhone] = useState('+1234567890');
	const [address, setAddress] = useState('123 Main Street, City, Country');

	return (
		<ScrollView className='flex-1 bg-white px-4 pt-10 pb-24'>
			<View className='gap-6'>
				{/* Name */}
				<View>
					<Text className='text-gray-500 mb-1'>Full Name</Text>
					<TextInput
						value={name}
						onChangeText={setName}
						className='border border-gray-300 px-3 py-6 text-lg rounded-lg'
					/>
				</View>

				{/* Email */}
				<View>
					<Text className='text-gray-500 mb-1'>Email</Text>
					<TextInput
						value={email}
						onChangeText={setEmail}
						keyboardType='email-address'
						className='border border-gray-300 px-3 py-6 text-lg rounded-lg'
					/>
				</View>

				{/* Phone */}
				<View>
					<Text className='text-gray-500 mb-1'>Phone Number</Text>
					<TextInput
						value={phone}
						onChangeText={setPhone}
						keyboardType='phone-pad'
						className='border border-gray-300 px-3 py-6 text-lg rounded-lg'
					/>
				</View>

				{/* Address */}
				<View>
					<Text className='text-gray-500 mb-1'>Address</Text>
					<TextInput
						value={address}
						onChangeText={setAddress}
						className='border border-gray-300 px-3 py-6 text-lg rounded-lg'
					/>
				</View>
			</View>

			{/* Save Button */}
			<Pressable className='bg-primary p-4 mt-20 rounded-lg items-center'>
				<Text className='text-white text-lg font-bold'>Save Changes</Text>
			</Pressable>
		</ScrollView>
	);
};

export default MyDetailsScreen;
