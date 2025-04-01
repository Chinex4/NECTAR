import {
	View,
	Text,
	TextInput,
	Image,
	ScrollView,
	Pressable,
	FlatList,
	StyleSheet,
} from 'react-native';
import SlideSection from '../SlideSection';


const Shop = () => {
	return (
		<>
			{/* Exclusive Offer */}
			<SlideSection title={'Exclusive Offer'} />
			{/* Best Selling */}
			<SlideSection title={'Best Selling'}/>
			{/* Groceries */}
			<SlideSection title={'Groceries'}/>
		</>
	);
};

export default Shop;

const styles = StyleSheet.create({
	
});
