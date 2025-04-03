import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import OTPVerification from '../screens/OTPVerification';
import SelectLocationScreen from '../screens/SelectLocationScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailSreen';
import { FavouriteContextProvider } from '../../store/context/favourites';
import { CartProvider } from '../../store/context/cart';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
	return (
		<NavigationContainer>
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
		</NavigationContainer>
	);
}
