// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDWxFRxlU_fwzZY3-nphkNJUyS-Z4PJc5c',
	authDomain: 'nectar-246dc.firebaseapp.com',
	projectId: 'nectar-246dc',
	storageBucket: 'nectar-246dc.firebasestorage.app',
	messagingSenderId: '295527864878',
	appId: '1:295527864878:web:9b468848c290f719ffddbf',
};

// Initialize Firebase
// Prevent initializing Firebase multiple times
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
export { auth, db };