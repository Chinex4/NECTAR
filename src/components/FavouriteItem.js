import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../../constants/fonts';
const FavouriteItem = ({ item }) => {
	const navigation = useNavigation();

	return (
		<Pressable
			onPress={() =>
				navigation.navigate('ProductDetail', {
					itemId: item.id,
				})
			}>
			<View className='flex-row items-center border-b py-5 border-gray-200 justify-between'>
				<View className='flex-row items-center gap-6'>
					<View>
						<Image
							style={{ maxWidth: 100 }}
							width={60}
							height={30}
							source={item.image}
						/>
					</View>
					<View>
						<Text
							className='text-xl'
							style={{ fontFamily: fonts.bold }}>
							{item.name}
						</Text>
						<Text
							className='text-gray-300'
							style={{ fontFamily: fonts.regular }}>
							{item.quantity}
						</Text>
					</View>
				</View>
				<View>
					<Ionicons
						name='arrow-forward'
						size={24}
					/>
				</View>
			</View>
		</Pressable>
	);
};

export default FavouriteItem;

const styles = StyleSheet.create({});
