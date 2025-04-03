import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../constants/fonts';

const DeliveryAddressScreen = () => {
	const navigation = useNavigation();
	const addresses = [
		{
			id: '1',
			name: 'Home',
			details: '123 Main Street, Asaba, Delta State',
		},
		{
			id: '2',
			name: 'Work',
			details: '456 Business Ave, Lagos, Nigeria',
		},
	];

	return (
		<View className='flex-1 bg-white px-4 pt-8 pb-24'>
			<FlatList
				data={addresses}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View className='bg-gray-100 p-4 mb-4 rounded-lg flex-row items-center justify-between'>
						<View>
							<Text style={{ fontFamily: fonts.semibold }} className='text-lg'>{item.name}</Text>
							<Text style={{ fontFamily: fonts.regular }} className='text-gray-500'>{item.details}</Text>
						</View>
						<Ionicons
							name='ellipsis-vertical'
							size={20}
							color='gray'
						/>
					</View>
				)}
			/>
			<Pressable
				onPress={() => navigation.navigate('AddAddress')}
				className='bg-primary p-4 rounded-lg flex-row items-center justify-center mt-4'>
				<Ionicons
					name='add-circle-outline'
					size={22}
					color='white'
				/>
				<Text style={{ fontFamily: fonts.regular }} className='text-white text-lg font-bold ml-2'>
					Add New Address
				</Text>
			</Pressable>
		</View>
	);
};

export default DeliveryAddressScreen;
