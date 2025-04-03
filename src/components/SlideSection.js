import {
	View,
	Text,
	FlatList,
	StyleSheet,
	Pressable,
} from 'react-native';
import { fonts } from '../../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';
import { shop } from '../data';



const SlideSection = ({ title }) => {
	const navigation = useNavigation()
	return (
		<>
			{/* Exclusive Offer */}
			<View className='mt-6'>
				<View className='flex-row justify-between items-center mb-4'>
					<Text
						className='text-3xl text-black'
						style={{ fontFamily: fonts.bold }}>
						{title}
					</Text>
					<Pressable android_ripple={{color: '#ccc'}} onPress={() => navigation.navigate('Explore')}>
						<Text
							className='text-primary text-xl'
							style={{ fontFamily: fonts.regular }}>
							See all
						</Text>
					</Pressable>
				</View>

				<FlatList
					className='pb-8'
					data={shop}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					renderItem={(itemData) => <Card item={itemData.item} />}
				/>
			</View>
		</>
	);
};

export default SlideSection;

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
