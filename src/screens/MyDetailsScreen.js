import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Pressable,
	ScrollView,
	ActivityIndicator, // Import ActivityIndicator
	Alert,
} from 'react-native';
import { auth, db } from '../../firebaseConfig'; // Import Firebase config
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { fonts } from '../../constants/fonts';
import Toast from 'react-native-toast-message';

const MyDetailsScreen = () => {
	const user = auth.currentUser;
	const [name, setName] = useState('');
	const [email, setEmail] = useState(user.email); // Email will be disabled
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');

	// Loading state for both fetching and saving data
	const [isFetching, setIsFetching] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (user) {
			fetchUserDetails();
		}
	}, []);

	// Fetch user details from Firestore
	const fetchUserDetails = async () => {
		try {
			setIsFetching(true); // Start loading
			if (!auth.currentUser) {
				console.error('No authenticated user found.');
				return;
			}

			const docRef = doc(db, 'users', auth.currentUser.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				setName(data.name || '');
				setEmail(data.email || user.email);
				setPhone(data.phone || '');
				setAddress(data.address || '');
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

	// Update user details in Firestore
	const handleUpdate = async () => {
		try {
			setIsSaving(true); // Start loading
			if (!auth.currentUser) {
				console.error('No authenticated user found.');
				return;
			}

			const userRef = doc(db, 'users', auth.currentUser.uid);
			const docSnap = await getDoc(userRef);

			if (docSnap.exists()) {
				// ✅ Update user details if document exists
				await updateDoc(userRef, {
					name,
					phone,
					address,
				});
				console.log('User details updated successfully.');
			} else {
				// ✅ Create a new document if it doesn't exist
				await setDoc(userRef, {
					name,
					email: auth.currentUser.email, // Ensure email is stored
					phone,
					address,
					createdAt: new Date(), // Optional timestamp
				});
				console.log('User details saved successfully.');
				Toast.show({
					type: 'success',
					text1: 'User details saved successfully.',
					text2: `User details saved successfully.`,
					position: 'top',
				});
			}
		} catch (error) {
			console.error('Error saving user details:', error);
			Alert('An error occured!');
		} finally {
			setIsSaving(false); // End loading
		}
	};

	return (
		<ScrollView className='flex-1 bg-white px-4 pt-10 pb-24'>
			<View className='gap-6'>
				{/* Name */}
				<View>
					<Text
						style={{ fontFamily: fonts.regular }}
						className='text-gray-500 mb-1'>
						Full Name
					</Text>
					<TextInput
						style={{ fontFamily: fonts.regular }}
						value={isFetching ? 'Loading...' : name}
						onChangeText={setName}
						className='border border-gray-300 px-3 py-6 text-lg rounded-lg'
					/>
				</View>

				{/* Email (Disabled) */}
				<View>
					<Text
						style={{ fontFamily: fonts.regular }}
						className='text-gray-500 mb-1'>
						Email
					</Text>
					<TextInput
						style={{ fontFamily: fonts.regular }}
						value={email}
						editable={false} // Disable editing
						className='border border-gray-300 px-3 py-6 text-lg rounded-lg bg-gray-100'
					/>
				</View>

				{/* Phone */}
				<View>
					<Text
						style={{ fontFamily: fonts.regular }}
						className='text-gray-500 mb-1'>
						Phone Number
					</Text>
					<TextInput
						style={{ fontFamily: fonts.regular }}
						value={isFetching ? 'Loading...' : phone}
						onChangeText={setPhone}
						keyboardType='phone-pad'
						className='border border-gray-300 px-3 py-6 text-lg rounded-lg'
					/>
				</View>

				{/* Address */}
				<View>
					<Text
						style={{ fontFamily: fonts.regular }}
						className='text-gray-500 mb-1'>
						Address
					</Text>
					<TextInput
						style={{ fontFamily: fonts.regular }}
						value={isFetching ? 'Loading...' : address}
						onChangeText={setAddress}
						className='border border-gray-300 px-3 py-6 text-lg rounded-lg'
					/>
				</View>
			</View>

			{/* Loading Spinner (if fetching or saving) */}
			{/* {(isFetching || isSaving) && (
				<View className='absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black bg-opacity-50'>
					<ActivityIndicator
						size='large'
						color='#fff'
					/>
				</View>
			)} */}

			{/* Save Button */}
			<Pressable
				onPress={handleUpdate}
				className='bg-primary p-4 mt-20 rounded-lg items-center'>
				<Text
					style={{ fontFamily: fonts.regular }}
					className='text-white text-lg font-bold'>
					{isSaving ? 'Updating...' : 'Save Changes'}
				</Text>
			</Pressable>
		</ScrollView>
	);
};

export default MyDetailsScreen;
