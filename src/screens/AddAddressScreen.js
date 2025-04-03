import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { fonts } from '../../constants/fonts';

const AddAddressScreen = () => {
    const navigation = useNavigation();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    
    const handleSave = () => {
        // Handle saving logic
        console.log({ address, city, state, zipCode });
        navigation.goBack();
    };
    
    return (
        <ScrollView className='flex-1 bg-white px-4 pt-8'>
            <TextInput
                placeholder='Address'
                value={address}
                onChangeText={setAddress}
                className='border px-4 py-6 rounded-lg mb-4'
            />
            
            <TextInput
                placeholder='City'
                value={city}
                onChangeText={setCity}
                className='border px-4 py-6 rounded-lg mb-4'
            />
            
            <TextInput
                placeholder='State'
                value={state}
                onChangeText={setState}
                className='border px-4 py-6 rounded-lg mb-4'
            />
            
            <TextInput
                placeholder='Zip Code'
                keyboardType='numeric'
                value={zipCode}
                onChangeText={setZipCode}
                className='border px-4 py-6 rounded-lg mb-6'
            />
            
            <Pressable
                onPress={handleSave}
                className='bg-primary py-3 rounded-lg items-center mt-20'>
                <Text style={{ fontFamily: fonts.bold }} className='text-white text-lg'>
                    Save Address
                </Text>
            </Pressable>
        </ScrollView>
    );
};

export default AddAddressScreen;
