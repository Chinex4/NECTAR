import { Image, Text } from 'react-native';
import { FlatList, View } from 'react-native';
import { categories, shop } from '../../data';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Card from '../Card';
import { fonts } from '../../../constants/fonts';

export const CategoryItemsScreen = ({ route }) => {
	const navigation = useNavigation();
	const { categoryId } = route.params;
	useLayoutEffect(() => {
		navigation.setOptions({
			title: categories.find((item) => item.id === categoryId).name,
		});
	}, [navigation, categories, categoryId]);
	const filteredItems = shop.filter((item) => item.categoryId === categoryId);

	return (
		<View className='px-4 flex-1 bg-white'>
			{filteredItems.length > 0 ? (
				<FlatList
					className='pb-8'
					data={filteredItems}
					showsVerticalScrollIndicator={false}
					columnWrapperStyle={{ justifyContent: 'space-between' }}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<View className='py-6 mb-4 w-[48%]'>
							<Card item={item} />
						</View>
					)}
					numColumns={2}
				/>
			) : (
				<View className='flex-1'>
					<Text
						style={{ fontFamily: fonts.regular }}
						className='text-center text-black mt-8 text-lg'>
						No items found.
					</Text>
				</View>
			)}
		</View>
	);
};
