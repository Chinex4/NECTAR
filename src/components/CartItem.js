import React, { useContext } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../../store/context/cart';
import { fonts } from '../../constants/fonts';

const CartItem = ({ item }) => {
	const { increaseQuantity, decreaseQuantity, removeFromCart } =
		useContext(CartContext);

	return (
		<View className='flex-row items-center justify-between bg-white p-4 rounded-lg shadow mb-2'>
			{/* Item Image */}
			<View className='flex-row gap-5'>
				<View className='min-w-[100px] items-center'>
					<Image
						style={{ maxWidth: 100 }}
						source={item.image}
						className='rounded-lg'
					/>
				</View>

				<View className='gap-5'>
					{/* Item Details */}
					<View className='flex-1'>
						<Text style={{ fontFamily: fonts.regular }} className='text-xl font-semibold'>{item.name}</Text>
						<Text style={{ fontFamily: fonts.regular }} className='text-gray-500 w-[100px]'>{item.description}</Text>
					</View>

					{/* Quantity Controls */}
					<View className='flex-row gap-4 items-center'>
						<Pressable
							onPress={() => decreaseQuantity(item.id)}
							className='p-2 border border-gray-200 rounded-full'>
							<Ionicons
								name='remove'
								size={24}
								color='#53B175'
							/>
						</Pressable>

						<Text style={{ fontFamily: fonts.regular }} className='mx-2 text-lg'>{item.quantity}</Text>

						<Pressable
							onPress={() => increaseQuantity(item.id)}
							className='p-2 border border-gray-200 rounded-full'>
							<Ionicons
								name='add'
								size={24}
								color='#53B175'
							/>
						</Pressable>
					</View>
				</View>
			</View>

			{/* Item Price & Remove */}
			<View className='flex-col-reverse gap-20 items-center'>
				<Text style={{ fontFamily: fonts.regular }} className='text-2xl -mt-4 font-semibold'>
					${(item.price * item.quantity).toFixed(2)}
				</Text>
				<Pressable
					onPress={() => removeFromCart(item.id)}
					className='ml-4'>
					<Ionicons
						name='close'
						size={30}
						color='gray'
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default CartItem;
