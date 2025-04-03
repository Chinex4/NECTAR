import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../constants/fonts';
import { CartContext } from '../../store/context/cart';
import { Ionicons } from "@expo/vector-icons";

const Card = ({ item }) => {
	const navigation = useNavigation();
	const { addToCart } = useContext(CartContext);

	const handleAddToCart = () => {
		addToCart(item);
	};
	return (
		<View
			style={styles.card}
			className='bg-white px-4 py-6 mr-4 rounded-[18px]'>
			<Pressable
				onPress={() =>
					navigation.navigate('ProductDetail', {
						itemId: item.id,
					})
				}
				className='flex-1'>
				<View className='flex-1 items-center'>
					<Image
						source={item.image}
						className='flex-1 w-full'
						resizeMode='contain'
					/>
				</View>
				<View className='mt-8'>
					<Text
						className='text-black mt-2 text-xl'
						style={{ fontFamily: fonts.semibold }}>
						{item.name}
					</Text>
					<Text style={{ fontFamily: fonts.semibold }} className='text-gray-400 truncate text-sm'>{item.description}</Text>
					<View className='mt-4 flex-row justify-between items-center'>
						<Text
							className='text-xl text-black mt-1'
							style={{ fontFamily: fonts.bold }}>
							${item.price}
						</Text>
						<Pressable
							onPress={handleAddToCart}
							className='w-12 h-12 rounded-2xl bg-primary justify-center items-center '>
							<Ionicons name='add' color={'white'} size={24} />
						</Pressable>
					</View>
				</View>
			</Pressable>
		</View>
	);
};

export default Card;

const styles = StyleSheet.create({
	card: {
		elevation: 8,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		width: 173,
		height: 248.15,
	},
});
