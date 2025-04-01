import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { dummyOrders } from './OrdersScreen';

const OrderDetailsScreen = ({ route }) => {
	const navigation = useNavigation();
	const orderId = route.params.orderId;
	const order = dummyOrders.find((order) => orderId == order.id);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: `Order #${order.id}`,
		});
	}, []);
	// const order = {
	//     id: "#123456",
	//     date: "March 15, 2024",
	//     status: "Delivered",
	//     items: [
	//         {
	//             id: 1,
	//             name: "Wireless Headphones",
	//             price: "$120",
	//             image: "https://via.placeholder.com/100",
	//         },
	//         {
	//             id: 2,
	//             name: "Smart Watch",
	//             price: "$80",
	//             image: "https://via.placeholder.com/100",
	//         },
	//     ],
	//     total: "$200",
	// };

	return (
		<ScrollView className='flex-1 bg-white px-4 pt-10 pb-24'>
			{/* Order Info */}
			<View className='mt-4 p-4 bg-gray-100 rounded-lg'>
				<Text className='text-lg font-bold'>Order ID: {order.id}</Text>
				<Text className='text-gray-500'>Date: {order.date}</Text>
				<Text className='text-green-600 font-bold'>Status: {order.status}</Text>
			</View>

			{/* Items */}
			<Text className='mt-6 text-xl font-bold'>Items</Text>
			{order.items.map((item) => (
				<View
					key={item.id}
					className='flex-row items-center p-4 border-b border-gray-200'>
					<Image
						source={item.image}
						className='w-16 h-16 rounded-lg'
					/>
					<View className='ml-4 flex-1'>
						<Text className='text-lg font-semibold'>{item.name}</Text>
						<Text className='text-gray-600'>{item.price}</Text>
					</View>
				</View>
			))}

			{/* Total Price */}
			<View className='mt-6 p-4 bg-gray-100 rounded-lg'>
				<Text className='text-lg font-bold'>Total Amount</Text>
				<Text className='text-xl text-green-600 font-bold'>{order.total}</Text>
			</View>
		</ScrollView>
	);
};

export default OrderDetailsScreen;
