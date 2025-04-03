import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../constants/fonts';

const NotificationsScreen = () => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		registerForPushNotificationsAsync();

		const subscription = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotifications((prev) => [notification.request.content, ...prev]);
			}
		);
		return () => subscription.remove();
	}, []);

	const registerForPushNotificationsAsync = async () => {
		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				Alert.alert(
					'Permission required',
					'Enable notifications to stay updated.'
				);
				return;
			}
		} else {
			Alert.alert(
				'Error',
				'Must use a physical device for push notifications.'
			);
		}
	};

	const sendTestNotification = async () => {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'Test Notification',
				body: 'This is a test push notification!',
			},
			trigger: null,
		});
	};

	return (
		<View className='flex-1 bg-white p-4'>
			{notifications.length > 0 ? (
				<FlatList
					data={notifications}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<View className='p-4 bg-gray-100 mb-2 rounded-md'>
							<Text style={{ fontFamily: fonts.regular }} className='text-lg font-semibold'>{item.title}</Text>
							<Text style={{ fontFamily: fonts.regular }} className='text-gray-600'>{item.body}</Text>
						</View>
					)}
				/>
			) : (
				<View className='flex-1 justify-center'>
				    <Text style={{ fontFamily: fonts.regular }} className='text-center text-gray-600'>
    					No notifications found.
    				</Text>
				</View>
			)}

			<Pressable
				className='mb-20 p-4 bg-primary rounded-md flex-row items-center justify-center'
				onPress={sendTestNotification}>
				<Ionicons
					name='notifications'
					size={20}
					color='white'
				/>
				<Text style={{ fontFamily: fonts.regular }} className='text-white text-lg ml-2'>Send Test Notification</Text>
			</Pressable>
		</View>
	);
};

export default NotificationsScreen;
