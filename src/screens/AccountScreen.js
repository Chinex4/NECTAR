import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../store/context/AuthContext';
import { auth, db } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from 'firebase/firestore';

const AccountScreen = () => {
	const navigation = useNavigation();
	const { user, logout } = useAuth();
	const [name, setName] = useState('Not set');

	const menuItems = [
		{ icon: 'cart-outline', label: 'Orders', screen: 'Orders' },
		{ icon: 'person-outline', label: 'My Details', screen: 'MyDetails' },
		{
			icon: 'location-outline',
			label: 'Delivery Address',
			screen: 'DeliveryAddress',
		},
		{
			icon: 'notifications-outline',
			label: 'Notifications',
			screen: 'Notifications',
		},
		{ icon: 'help-circle-outline', label: 'Help', screen: 'Help' },
		{ icon: 'information-circle-outline', label: 'About', screen: 'About' },
	];

	const handleLogout = async () => {
		await signOut(auth);
		await AsyncStorage.removeItem('authToken');
		navigation.navigate('Login');
	};
	useEffect(() => {
		if (user) {
			fetchUserDetails();
		}
	}, []);

	// Fetch user details from Firestore
	const fetchUserDetails = async () => {
		try {
			if (!auth.currentUser) {
				console.error('No authenticated user found.');
				return;
			}

			const docRef = doc(db, 'users', auth.currentUser.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				setName(data.name || '');
			} else {
				console.log('No user details found.');
				Alert('An error occured!');
			}
		} catch (error) {
			console.error('Error fetching user details:', error);
			Alert('An error occured!');
		} finally {
			setIsFetching(false); // End loading
		}
	};

	return (
		<View className='flex-1 bg-white px-4 pt-16 pb-24'>
			{/* Profile Section */}
			<View className='bg-white p-6 items-center flex-row gap-4'>
				<Image
					source={{ uri: 'data:image/jpeg;base64,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' }}
					className='w-16 h-16 rounded-full'
				/>
				<View className='flex-1'>
					<Text
						style={{ fontFamily: fonts.bold }}
						className='text-2xl font-semibold'>
						{name}
					</Text>
					<Text
						style={{ fontFamily: fonts.regular }}
						className='text-gray-500 text-sm'>
						{user ? user.email : 'No user logged in'}
					</Text>
				</View>
				<Ionicons
					name='create-outline'
					size={20}
					color='green'
					onPress={() => navigation.navigate('MyDetails')}
				/>
			</View>

			{/* Menu Items */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				className='mt-2'>
				{menuItems.map((item, index) => (
					<Pressable
						android-ripple={true}
						onPress={() => navigation.navigate(`${item.screen}`)}
						key={index}
						className='flex-row items-center bg-white pb-4 pt-8  px-5 border-b border-gray-200'>
						<Ionicons
							name={item.icon}
							size={22}
							color='gray'
							className='mr-4'
						/>
						<Text
							style={{ fontFamily: fonts.regular }}
							className='text-xl flex-1 font-regular'>
							{item.label}
						</Text>
						<Ionicons
							name='chevron-forward-outline'
							size={20}
							color='gray'
						/>
					</Pressable>
				))}

				{/* Logout Button */}
				<Pressable
					onPress={() => handleLogout()}
					android-ripple={{ color: '#ccc' }}
					style={({ pressed }) => pressed && { opacity: 0.75 }}
					className='flex-row items-center justify-center bg-gray-100 py-4 mt-8 mx-4 rounded-lg shadow-md'>
					<Ionicons
						name='log-out-outline'
						size={22}
						color='green'
					/>
					<Text
						style={{ fontFamily: fonts.regular }}
						className='ml-2 text-lg text-primary font-bold'>
						Log Out
					</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
};

export default AccountScreen;
