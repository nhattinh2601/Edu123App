import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Information from './Information';

const Home = ({ navigation }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Information');
    }, countdown * 1000);

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [countdown, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello!!!</Text>
      <Text style={[styles.countdownText, { color: 'blue' }]}>Please wait until later: {countdown} seconds</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
  countdownText: {
    fontSize: 18,
  },
});

export default Home;
