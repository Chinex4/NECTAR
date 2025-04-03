import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './global.css';
import StackNavigator from './src/navigation/StackNavigator';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './store/context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
export default function App() {
	const [appReady, setAppReady] = useState(false);
	const [fontsLoaded] = useFonts({
		'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
		'Gilroy-Regular': require('./assets/fonts/Gilroy-Regular.ttf'),
		'Gilroy-Semibold': require('./assets/fonts/Gilroy-SemiBold.ttf'),
	});
	useEffect(() => {
		async function prepare() {
			// Simulate some async task (like loading fonts, fetching data, etc.)
			await new Promise((resolve) => setTimeout(resolve, 2000));
			setAppReady(true);
			await SplashScreen.hideAsync(); // Hide splash screen when ready
		}
		prepare();
	}, []);
	if (!appReady && !fontsLoaded) {
		return null; // Return nothing while loading
	}

	console.log('Fonts Loaded: ', fontsLoaded);

	return (
		<>
			<AuthProvider>
				<StackNavigator />
			</AuthProvider>
			<Toast />
		</>
	);
}
