import { createContext, useState } from 'react';
import Toast from 'react-native-toast-message';

const FavouriteContext = createContext({
	favList: [],
	addFavourite: (productId) => {},
	removeFavourite: (productId) => {},
});

const FavouriteContextProvider = ({ children }) => {
	const [favList, setFavList] = useState([]);
	const addFavourite = (productId) => {
		setFavList((currentFavList) => [productId, ...currentFavList]);
		Toast.show({
			type: 'success',
			text1: 'Added to Favourites',
			text2: `Product has been added!`,
			position: 'top',
		});
	};
	const removeFavourite = (productId) => {
		setFavList((currentFavList) =>
			currentFavList.filter((id) => id !== productId)
		);
		Toast.show({
			type: 'success',
			text1: 'Removed from Favourites',
			text2: `Product has been Removed!`,
			position: 'top',
		});
	};
    const value = {
        favList,
        addFavourite,
        removeFavourite,
    }
	return <FavouriteContext.Provider value={value}>{children}</FavouriteContext.Provider>;
};


export { FavouriteContext, FavouriteContextProvider };
