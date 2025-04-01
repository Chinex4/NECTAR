import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { fonts } from '../../constants/fonts';

const MyButton = ({onClick, text, bg = 'primary', className = ''}) => {
	return (
		<Pressable
			android_ripple={{ color: 'white' }}
			className={`bg-${bg} py-4 rounded-lg ${className}`}
			onPress={onClick}>
			<Text
				className='text-white text-center text-2xl '
				style={{ fontFamily: fonts.bold }}>
				{text}
			</Text>
		</Pressable>
	);
};

export default MyButton;
