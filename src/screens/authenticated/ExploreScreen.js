import {
	FlatList,
	Image,
	Pressable,
	Text,
	TextInput,
	View,
} from 'react-native';
import React from 'react';
import { fonts } from '../../constants/fonts';
import { categories } from '../../data';

const ExploreScreen = ({ navigation }) => {
	const handlePress = (id) => {
		navigation.navigate('CategoryItems', {
			categoryId: id,
		});
	};
	return (
		<View className='flex-1 bg-white pt-12'>
			<View className='p-4 bg-white'>
				<Text
					style={{ fontFamily: fonts.bold }}
					className='text-3xl text-center font-semibold mb-4'>
					Find Products
				</Text>

				{/* Search Bar */}
				<View className='pb-5'>
					<View className='bg-gray-100 rounded-xl p-3 flex-row items-center'>
						<TextInput
							placeholder='Search Store'
							className='flex-1 text-black'
							style={{ fontFamily: fonts.regular }}
						/>
					</View>
				</View>

				{/* Categories Grid */}
				<FlatList
					data={categories}
					keyExtractor={(item) => item.id.toString()}
					numColumns={2}
					className='pb-20'
					showsVerticalScrollIndicator={false}
					columnWrapperStyle={{ justifyContent: 'space-between' }} // Ensures spacing between columns
					renderItem={({ item }) => (
						<Pressable
							onPress={() => handlePress(item.id)}
							style={{
								backgroundColor: item.color + '99',
								borderWidth: 3,
								borderColor: item.color,
							}}
							android_ripple={{ color: '#ccc', borderless: false }}
							className='p-4 border rounded-xl mb-4 w-[48%]'>
							<View className='items-center'>
								<Image
									source={item.image}
									className='w-20 h-20'
									resizeMode='contain'
								/>
								<Text
									style={{ fontFamily: fonts.bold }}
									className='text-base text-center mt-2'>
									{item.name}
								</Text>
							</View>
						</Pressable>
					)}
				/>
			</View>
		</View>
	);
};

export default ExploreScreen;
