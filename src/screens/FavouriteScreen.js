import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { fonts } from '../../constants/fonts';
import { FavouriteContext } from '../../store/context/favourites';
import { shop } from '../data';
import FavouriteItem from '../components/FavouriteItem';

const FavouriteScreen = () => {
	const { favList } = useContext(FavouriteContext);

	const favourites = shop.filter((item) => favList.includes(item.id));
	return (
		<View className='flex-1 bg-white pt-12'>
			<View className='p-4 bg-white flex-1 pb-24'>
				<Text
					style={{ fontFamily: fonts.bold }}
					className='text-3xl border-b pb-5 border-gray-200 text-center font-semibold mb-4'>
					Favourites
				</Text>

				{favourites.length > 0 ? (
					<FlatList
						data={favourites}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <FavouriteItem item={item} />}
						contentContainerStyle={{ paddingBottom: 80 }} // Ensure space for button
					/>
				) : (
					<View className='flex-1 justify-center items-center'>
						<Text
							style={{ fontFamily: fonts.regular }}
							className='text-center text-black text-lg'>
							No items added to favourites yet.
						</Text>
					</View>
				)}
			</View>

			{/* Render button only if favourites exist */}
			{favourites.length > 0 && (
				<View style={styles.buttonContainer}>
					<Pressable android-ripple={{color: '#ccc'}} className='w-full bg-primary py-4 rounded-2xl items-center'>
						<Text
							style={{ fontFamily: fonts.bold }}
							className='text-white text-xl'>
							Add All to Basket
						</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
};

export default FavouriteScreen;

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
