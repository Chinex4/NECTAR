import React, { createContext, useState } from 'react';
import Toast from 'react-native-toast-message';

export const CartContext = createContext({
	cart: [],
	addToCart: (item) => {},
	removeFromCart: (id) => {},
	increaseQuantity: (id) => {},
	decreaseQuantity: (ID) => {},
	clearCart: () => {},
	cartItemCount: 0,
	totalPrice: 0,
});

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	// Add item to cart
	const addToCart = (item) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
			if (existingItem) {
				// If item exists, update quantity
				return prevCart.map((cartItem) =>
					cartItem.id === item.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			} else {
				// Add new item with quantity
				return [...prevCart, { ...item, quantity: 1 }];
			}
		});
		Toast.show({
			type: 'success',
			text1: 'Added to Cart',
			text2: `${item.name} has been added!`,
			position: 'top',
		});
	};

	// Remove item from cart
	const removeFromCart = (id) => {
		setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
		Toast.show({
			type: 'success',
			text1: 'Removed from Cart',
			text2: `Product has been removed!`,
			position: 'top',
		});
	};

	// Increase item quantity
	const increaseQuantity = (id) => {
		setCart((prevCart) =>
			prevCart.map((cartItem) =>
				cartItem.id === id
					? { ...cartItem, quantity: cartItem.quantity + 1 }
					: cartItem
			)
		);
	};

	// Decrease item quantity
	const decreaseQuantity = (id) => {
		setCart((prevCart) =>
			prevCart.map((cartItem) =>
				cartItem.id === id
					? {
							...cartItem,
							quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1,
					  }
					: cartItem
			)
		);
	};

	// Clear all items in cart
	const clearCart = () => {
		setCart([]);
	};

	// Get total cart items count
	const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

	// Get total cart price
	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				increaseQuantity,
				decreaseQuantity,
				clearCart,
				cartItemCount,
				totalPrice,
			}}>
			{children}
		</CartContext.Provider>
	);
};
