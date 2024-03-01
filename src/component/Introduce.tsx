import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import logo from '../image/logo.png'; 

const Home = () => {
  const navigation = useNavigation(); 

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('HomePage');
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>Please wait...</Text>
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
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    marginVertical: 20,
  },
});

export default Home;
