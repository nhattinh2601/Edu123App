
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function User() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userID, setUserID] = useState('');
  const getData = async () => {
    try {      
      const userID = await AsyncStorage.getItem('UserId');
      setUserID(userID);      
    } catch (e) {      
      console.log('Lỗi khi lấy dữ liệu:', e);
    }
  }

  const handleLogout = async () => {
    // await AsyncStorage.removeItem('username');
    // await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('UserId');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }, { name: 'User' }],
    });
    navigation.navigate('Home');
  };

  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  return (
    <View className='justify-center items-center w-[100%] h-[100%]'>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md"
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text className="text-white text-base font-bold">Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md"
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}>
        <Text className="text-white text-base font-bold">Change password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md"
        onPress={handleLogout}>
        <Text className="text-white text-base font-bold">Đăng xuất</Text>
      </TouchableOpacity>
      <View>
        <Text>{userID}</Text>
        <Text>{username}</Text>
        <Text>{password}</Text>
      </View>
    </View>
  )
}