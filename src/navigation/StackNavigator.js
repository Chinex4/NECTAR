import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import OTPVerification from '../screens/auth/OTPVerification';
import SelectLocationScreen from '../screens/auth/SelectLocationScreen';
import HomeScreen from '../screens/authenticated/HomeScreen';
import ProductDetailScreen from '../screens/authenticated/ProductDetailSreen';
import { FavouriteContextProvider } from '../../store/context/favourites';
import { CartProvider } from '../../store/context/cart';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	<Stack.Navigator
		initialRouteName='Signup'
		screenOptions={{ headerShown: false }}>
		<Stack.Screen
			name='Signup'
			component={Signup}
		/>
		<Stack.Screen
			name='Login'
			component={Login}
		/>
		<Stack.Screen
			name='OTPVerification'
			component={OTPVerification}
		/>
		<Stack.Screen
			name='SelectLocation'
			component={SelectLocationScreen}
		/>
	</Stack.Navigator>;
};

const AuthenticatedStack = () => {
	<Stack.Navigator
		initialRouteName='Home'
		screenOptions={{ headerShown: false }}>
		<CartProvider>
			<FavouriteContextProvider>
				<Stack.Navigator
					initialRouteName='Home'
					screenOptions={{ headerShown: false }}>
					{/* <Stack.Screen
							name='Splash'
							component={SplashScreen}
						/> */}
					<Stack.Screen
						name='Onboarding'
						component={OnboardingScreen}
					/>
					<Stack.Screen
						name='Onboarding2'
						component={OnboardingScreen2}
					/>

					<Stack.Screen
						name='Home'
						component={HomeScreen}
					/>
					<Stack.Screen
						name='ProductDetail'
						component={ProductDetailScreen}
					/>
				</Stack.Navigator>
			</FavouriteContextProvider>
		</CartProvider>
	</Stack.Navigator>;
};

export default function StackNavigator() {
	const [authToken, setAuthToken] = useState(true)
	let content = <AuthStack />;

	if (authToken) {
		content = <AuthenticatedStack />;
	}

	return <NavigationContainer>{content}</NavigationContainer>;
}
