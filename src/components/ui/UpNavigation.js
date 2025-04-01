import { StyleSheet, View, TouchableOpacity, Image, Pressable } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const UpNavigation = ({ displayName = 'Guest' }) => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		} else {
			navigation.navigate('Onboarding'); // Replace 'Home' with your default screen
		}
	};

	return (
		<View className='top-56' style={styles.upNavigation}>
			<Pressable onPress={handleGoBack}>
				<View>
					<Ionicons
						name='arrow-back'
						size={30}
						color='#53B175'
					/>
				</View>
			</Pressable>
			
		</View>
	);
};

export default UpNavigation;

const styles = StyleSheet.create({
	arrowContainer: {
		backgroundColor: '#eee',
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	upNavigation: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		zIndex: 20,
		top: 80,
		left: 20,
		position: 'absolute',
	},
});
