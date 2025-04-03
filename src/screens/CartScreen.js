import React, { useContext } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { CartContext } from '../../store/context/cart';
import CartItem from '../components/CartItem';
import { fonts } from '../../constants/fonts';

const CartScreen = () => {
	const { cart, totalPrice } = useContext(CartContext);

	return (
		<View className='flex-1 bg-white'>
			{/* Header */}
			<Text
				style={{ fontFamily: fonts.bold }}
				className='text-3xl border-b pt-16 pb-5 border-gray-200 text-center font-semibold mb-4'>
				My Cart
			</Text>

			{/* Conditional Rendering */}
			{cart.length > 0 ? (
				<>
					{/* Cart List */}
					<FlatList
						data={cart}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <CartItem item={item} />}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 100 }}
					/>

					{/* Checkout Button */}
					<View style={styles.buttonContainer}>
						<Pressable android-ripple={{color: '#ccc'}} className='w-full bg-primary py-4 px-6 rounded-2xl flex-row justify-between items-center'>
							<Text style={{ fontFamily: fonts.regular }} className='text-white text-2xl font-semibold'>
								Go to Checkout
							</Text>
							<Text style={{ fontFamily: fonts.regular }} className='text-white text-2xl font-semibold'>
								${totalPrice.toFixed(2)}
							</Text>
						</Pressable>
					</View>
				</>
			) : (
				<View className='flex-1 justify-center items-center'>
					<Text style={{ fontFamily: fonts.regular }} className='text-lg text-gray-500'>Your cart is empty</Text>
				</View>
			)}
		</View>
	);
};

export default CartScreen;
const styles = StyleSheet.create({
	buttonContainer: {
		position: 'absolute',
		bottom: 60,
		left: 20,
		right: 20,
		// backgroundColor: '#34D399', // Adjust primary color
		borderRadius: 12,
		paddingVertical: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
});