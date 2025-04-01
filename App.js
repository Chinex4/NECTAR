import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './global.css';
import StackNavigator from './src/navigation/StackNavigator';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Toast from 'react-native-toast-message';

export default function App() {
	const [fontsLoaded] = useFonts({
		'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
		'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
		'Gilroy-Semibold': require('./assets/fonts/Gilroy-SemiBold.ttf'),
	});

	console.log('Fonts Loaded: ', fontsLoaded);
	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<>
			<StackNavigator />
			<Toast />
		</>
	);
}
