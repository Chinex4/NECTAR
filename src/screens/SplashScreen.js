import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000); // Delay for 3 seconds
  }, []);

  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <Image className="" source={require('../../assets/images/logo.png')} />
    </View>
  );
};

export default SplashScreen;

