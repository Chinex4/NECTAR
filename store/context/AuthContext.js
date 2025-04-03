// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const AuthContext = createContext({
	user: {},
	logout: () => {},
	loading: true,
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Listen for auth state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return () => unsubscribe(); // Cleanup listener on unmount
	}, []);

	// Logout function
	const logout = async () => {
		await signOut(auth);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
