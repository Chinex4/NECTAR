import React, { useContext } from 'react';
import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../constants/fonts';
import Shop from '../../components/hometabs/Shop';
import ExploreScreen from './ExploreScreen';
import FavouriteScreen from './FavouriteScreen';
import CartScreen from './CartScreen';
import AccountScreen from './AccountScreen';
import { CategoryItemsScreen } from '../../components/hometabs/CatgoryItemsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartContext } from '../../../store/context/cart';
import OrderScreen from './OrdersScreen';
import OrderDetailsScreen from './OrderDetails';
import MyDetailsScreen from './MyDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Create a Stack Navigator

// Shop Screen with Category Navigation
const ExploreStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen
			name='ExploreScreen'
			component={ExploreScreen}
		/>
		<Stack.Screen
			name='CategoryItems'
			component={CategoryItemsScreen}
			options={{
				headerShown: true,
				headerTitleStyle: { fontFamily: fonts.bold },
			}}
		/>
	</Stack.Navigator>
);
const AccountStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen
			name='AccountScreen'
			component={AccountScreen}
		/>
		<Stack.Screen
			name='Orders'
			component={OrderScreen}
			options={{ headerShown: true }}
		/>
		<Stack.Screen
			name='OrderDetails'
			component={OrderDetailsScreen}
			options={{ headerShown: true }}
		/>
		<Stack.Screen
			name='MyDetails'
			component={MyDetailsScreen}
			options={{ headerShown: true, title: 'My Details' }}
		/>
	</Stack.Navigator>
);

const ShopScreen = () => (
	<View className='flex-1 bg-white pt-12'>
		<View className='px-4'>
			<View className='items-center mb-4'>
				<Image source={require('../../../assets/images/logo2.png')} />
				<Text
					className='text-lg text-black mt-2'
					style={{ fontFamily: fonts.semibold }}>
					Olori 19, Abraka
				</Text>
			</View>
			<View className='pb-5'>
				<View className='bg-gray-100 rounded-xl p-3 flex-row items-center'>
					<TextInput
						placeholder='Search Store'
						className='flex-1 text-black'
						style={{ fontFamily: fonts.regular }}
					/>
				</View>
			</View>
		</View>
		<ScrollView
			className='px-4 bg-white'
			showsVerticalScrollIndicator={false}>
			<View className='mt-5'>
				<Image
					source={require('../../../assets/images/banner.png')}
					className='w-full h-28 rounded-xl'
				/>
			</View>
			<Shop />
		</ScrollView>
	</View>
);
const HomeScreen = () => {
	const { cartItemCount } = useContext(CartContext);
	return (
		<>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color, size }) => {
						const icons = {
							Shop: 'home-outline',
							Explore: 'search-outline',
							Cart: 'cart-outline',
							Favourite: 'heart-outline',
							Account: 'person-outline',
						};
						return (
							<Ionicons
								name={icons[route.name]}
								size={28}
								color={color}
							/>
						);
					},
					tabBarActiveTintColor: '#53B175',
					tabBarInactiveTintColor: 'gray',
					tabBarStyle: {
						backgroundColor: 'white',
						borderTopColor: '#E5E5E5',
						paddingHorizontal: 5,
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 0,
						height: 60, // Adjusted height to properly show labels
						paddingBottom: 10, // Ensuring enough space without hiding labels
					},
					tabBarLabelStyle: { fontFamily: fonts.regular, fontSize: 14 },
				})}>
				<Tab.Screen
					name='Shop'
					component={ShopScreen}
					options={{ headerShown: false }}
				/>
				<Tab.Screen
					name='Explore'
					component={ExploreStack}
					options={{ headerShown: false }}
				/>

				<Tab.Screen
					name='Cart'
					component={CartScreen}
					options={{
						headerShown: false,
						tabBarBadge: cartItemCount,
						tabBarBadgeStyle: { backgroundColor: 'green' },
					}}
				/>
				<Tab.Screen
					name='Favourite'
					component={FavouriteScreen}
					options={{ headerShown: false }}
				/>
				<Tab.Screen
					name='Account'
					component={AccountStack}
					options={{ headerShown: false }}
				/>
			</Tab.Navigator>
		</>
	);
};

export default HomeScreen;
