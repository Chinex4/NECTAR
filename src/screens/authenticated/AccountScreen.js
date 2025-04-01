import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../constants/fonts';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
	const navigation = useNavigation();
	const menuItems = [
		{ icon: 'cart-outline', label: 'Orders', screen: 'Orders' },
		{ icon: 'person-outline', label: 'My Details', screen: 'MyDetails' },
		{ icon: 'location-outline', label: 'Delivery Address', screen: 'Orders' },
		{ icon: 'notifications-outline', label: 'Notifications', screen: 'Orders' },
		{ icon: 'help-circle-outline', label: 'Help', screen: 'Orders' },
		{ icon: 'information-circle-outline', label: 'About', screen: 'Orders' },
	];

	return (
		<View className='flex-1 bg-white px-4 pt-16 pb-24'>
			{/* Profile Section */}
			<View className='bg-white p-6 items-center flex-row space-x-4'>
				<Image
					source={{ uri: 'https://via.placeholder.com/100' }}
					className='w-16 h-16 rounded-full'
				/>
				<View className='flex-1'>
					<Text
						style={{ fontFamily: fonts.bold }}
						className='text-2xl font-semibold'>
						Afsar Hossen
					</Text>
					<Text
						style={{ fontFamily: fonts.regular }}
						className='text-gray-500 text-sm'>
						lmshuvo97@gmail.com
					</Text>
				</View>
				<Ionicons
					name='create-outline'
					size={20}
					color='green'
				/>
			</View>

			{/* Menu Items */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				className='mt-2'>
				{menuItems.map((item, index) => (
					<Pressable
						android-ripple={true}
						onPress={() => navigation.navigate(`${item.screen}`)}
						key={index}
						className='flex-row items-center bg-white pb-4 pt-8  px-5 border-b border-gray-200'>
						<Ionicons
							name={item.icon}
							size={22}
							color='gray'
							className='mr-4'
						/>
						<Text
							style={{ fontFamily: fonts.regular }}
							className='text-xl flex-1 font-regular'>
							{item.label}
						</Text>
						<Ionicons
							name='chevron-forward-outline'
							size={20}
							color='gray'
						/>
					</Pressable>
				))}

				{/* Logout Button */}
				<Pressable className='flex-row items-center justify-center bg-gray-100 py-4 mt-8 mx-4 rounded-lg shadow-md'>
					<Ionicons
						name='log-out-outline'
						size={22}
						color='green'
					/>
					<Text
						style={{ fontFamily: fonts.regular }}
						className='ml-2 text-lg text-primary font-bold'>
						Log Out
					</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
};

export default AccountScreen;
