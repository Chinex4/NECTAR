import React, { useState, useContext, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	Pressable,
	TextInput,
} from 'react-native';
import { fonts } from '../../constants/fonts';
import UpNavigation from '../../components/ui/UpNavigation';
import { Ionicons } from '@expo/vector-icons';
import { FavouriteContext } from '../../../store/context/favourites';
import { shop } from '../../data';
import { CartContext } from '../../../store/context/cart';

const ProductDetailScreen = ({ route }) => {
	const itemId = route.params.itemId;
	const item = shop.find((item) => item.id === itemId);
	const { addFavourite, favList, removeFavourite } = useContext(FavouriteContext);
	const { addToCart, increaseQuantity, decreaseQuantity, cart } = useContext(CartContext);

	const cartItem = cart.find((cartItem) => cartItem.id === itemId);
	const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

	const isFavourite = favList.includes(itemId);

	const handleAddToCart = () => {
		if (cartItem) {
			// Update the cart if item is already there
			addToCart({ ...item, quantity });
		} else {
			// Add new item to the cart
			addToCart({ ...item, quantity: 1 });
		}
	};
	
	const handleQuantityChange = (type) => {
		if (!cartItem) return;
	
		let newQuantity = quantity;
		if (type === 'lower' && quantity > 1) {
			newQuantity -= 1;
			decreaseQuantity(itemId);
		} else if (type === 'higher') {
			newQuantity += 1;
			increaseQuantity(itemId);
		}
		setQuantity(newQuantity);
	};
	

	const changeFavouriteHandler = () => {
		isFavourite ? removeFavourite(itemId) : addFavourite(itemId);
	};

	useEffect(() => {
		if (cartItem) {
			setQuantity(cartItem.quantity);
		}
	}, [cartItem]);

	return (
		<>
			<UpNavigation />
			<View className='flex-1 bg-white'>
				{/* Image */}
				<View className='bg-gray-200 py-20 h-[350px] items-center rounded-b-2xl'>
					<Image
						style={{ width: 250, height: 250, resizeMode: 'contain' }}
						source={item.image}
					/>
				</View>

				<ScrollView className='px-4'>
					{/* Title & Price */}
					<View className='mt-12'>
						<View className='flex-row justify-between items-center'>
							<View>
								<Text className='text-3xl text-black' style={{ fontFamily: fonts.bold }}>
									{item.name}
								</Text>
								<Text className='text-gray-500 text-lg' style={{ fontFamily: fonts.regular }}>
									{item.description}
								</Text>
							</View>
							<Pressable onPress={changeFavouriteHandler}>
								<Ionicons
									name={isFavourite ? 'heart' : 'heart-outline'}
									color={isFavourite ? 'red' : 'gray'}
									size={28}
								/>
							</Pressable>
						</View>
						<View className='flex-row items-center justify-between mt-5'>
							<View className='flex-row gap-5'>
								<Pressable disabled={quantity <= 1} onPress={() => handleQuantityChange('lower')}>
									<Text className={`text-[35px] mt-1 ${quantity <= 1 ? 'text-gray-200' : 'text-primary'}`} style={{ fontFamily: fonts.bold }}>
										-
									</Text>
								</Pressable>

								<TextInput
									value={quantity.toString()}
									onChangeText={(text) => setQuantity(Number(text))}
									keyboardType='numeric'
									className='text-center text-lg border border-gray-200 rounded-lg px-3 py-3'
									style={{ fontFamily: fonts.regular, width: 50 }}
								/>

								<Pressable onPress={() => handleQuantityChange('higher')}>
									<Text className='text-[35px] text-primary mt-1' style={{ fontFamily: fonts.bold }}>
										+
									</Text>
								</Pressable>
							</View>
							<Text className='text-3xl text-black mt-1' style={{ fontFamily: fonts.bold }}>
								${item.price}
							</Text>
						</View>
					</View>
					{/* Product Details */}
					<View className='mt-6 border-t border-gray-100 pt-6'>
						<Text
							className='text-black text-xl'
							style={{ fontFamily: fonts.semibold }}>
							Product Detail
						</Text>
						<Text
							className='text-gray-500 text-lg mt-1'
							style={{ fontFamily: fonts.regular }}>
							{item.description}
						</Text>
					</View>
					{/* Review & Rating */}
					<View className='mt-4'>
						<Text
							className='text-black text-xl'
							style={{ fontFamily: fonts.semibold }}>
							Review
						</Text>
						<Text className='text-yellow-500 text-lg mt-1'>★★★★★</Text>
					</View>

					{/* Add to Basket */}
					<Pressable onPress={handleAddToCart} className='bg-primary py-4 rounded-xl mt-16'>
						<Text className='text-center text-white text-lg' style={{ fontFamily: fonts.bold }}>
							Add to Cart
						</Text>
					</Pressable>
				</ScrollView>
			</View>
		</>
	);
};

export default ProductDetailScreen;
