import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="bg-black h-full w-full">
      <Text className='text-white'>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


