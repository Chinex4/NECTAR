import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { fonts } from '../../constants/fonts';
import { useNavigation } from '@react-navigation/native';

export const dummyOrders = [
	{
		id: '1',
		items: [
			{
				id: '101',
				name: 'Wireless Headphones',
				image: require('../../assets/images/chicken.png'),
				price: 59.99,
			},
		],
		total: 59.99,
		status: 'Delivered',
		date: '2024-03-25',
	},
	{
		id: '2',
		items: [
			{
				id: '102',
				name: 'Smart Watch',
				image: require('../../assets/images/chicken.png'),
				price: 79.99,
			},
			{
				id: '103',
				name: 'Bluetooth Speaker',
				image: require('../../assets/images/chicken.png'),
				price: 49.99,
			},
		],
		total: 129.98,
		status: 'Shipped',
		date: '2024-03-27',
	},
	{
		id: '3',
		items: [
			{
				id: '104',
				name: 'Gaming Mouse',
				image: require('../../assets/images/chicken.png'),
				price: 39.99,
			},
		],
		total: 39.99,
		status: 'Pending',
		date: '2024-03-28',
	},
];

const OrderScreen = () => {
	const [orders, setOrders] = useState(dummyOrders);
	const navigation = useNavigation();

	return (
		<>
			<View className='flex-1 bg-white'>
				<ScrollView className='px-4 pb-44 pt-8'>
					{orders.map((order) => (
						<View
							key={order.id}
							className='bg-gray-100 p-4 rounded-lg mb-4'>
							<Text
								className='text-lg font-bold text-black'
								style={{ fontFamily: fonts.semibold }}>
								Order #{order.id}
							</Text>
							<Text
								className='text-gray-500'
								style={{ fontFamily: fonts.regular }}>
								Date: {order.date}
							</Text>
							<Text
								className={`mt-2 text-sm font-bold ${
									order.status === 'Delivered'
										? 'text-green-600'
										: order.status === 'Shipped'
										? 'text-blue-600'
										: 'text-orange-600'
								}`}
								style={{ fontFamily: fonts.semibold }}>
								Status: {order.status}
							</Text>

							{order.items.map((item) => (
								<View
									key={item.id}
									className='flex-row items-center mt-3'>
									<Image
										source={item.image}
										className='w-16 h-16 rounded-lg'
									/>
									<View className='ml-4'>
										<Text
											className='text-black text-lg'
											style={{ fontFamily: fonts.semibold }}>
											{item.name}
										</Text>
										<Text
											className='text-gray-600'
											style={{ fontFamily: fonts.regular }}>
											${item.price.toFixed(2)}
										</Text>
									</View>
								</View>
							))}

							<Text
								className='text-black text-lg font-bold mt-3'
								style={{ fontFamily: fonts.bold }}>
								Total: ${order.total.toFixed(2)}
							</Text>

							<Pressable
								onPress={() =>
									navigation.navigate('OrderDetails', { orderId: order.id })
								}
								android_ripple={{ color: '#ccc' }}
								className='bg-primary mt-4 py-3 rounded-lg'>
								<Text
									className='text-center text-white text-lg'
									style={{ fontFamily: fonts.bold }}>
									View Details
								</Text>
							</Pressable>
						</View>
					))}
				</ScrollView>
			</View>
		</>
	);
};

export default OrderScreen;
