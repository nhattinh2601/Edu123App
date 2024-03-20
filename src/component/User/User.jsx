
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../api/axiosClient';
import Ionic from 'react-native-vector-icons/Ionicons';
import Spinner from "react-native-loading-spinner-overlay";


export default function User() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [fullname, setFullname] = useState('');
  const [userID, setUserID] = useState('');
  const getData = async () => {
    try {
      const userID = await AsyncStorage.getItem('UserId');
      if (userID) {
        setUserID(userID);
        setIsLoading(true);
        const response = await axiosClient.get('/users/' + userID);
        setIsLoading(false);
        setEmail(response.data.email);
        setFullname(response.data.fullname);
        setAvatar(response.data.avatar);        
      }
    } catch (e) {
      console.log('Lỗi khi lấy dữ liệu hoặc không có thông tin người dùng!', e);
    }
  }

  const showWarningLogout = () => {
    Alert.alert(
        'Đăng xuất',
        'Bạn thật sự muốn đăng xuất ?', [        
        {
          text: 'Đóng',
          style: 'cancel',         
        },
        {
          text: 'Đăng xuất',
          onPress: () => handleLogout(),
          style: 'destructive'
        },
      ],
        {
          cancelable: true,
          onDismiss: () => console.warn('Alert dismissed!')
        })
  }

  const handleLogout = async () => {
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
    <View className=' flex-1 items-center bg-white'>
      {/* View bên trong */}
      {avatar ? (<View className='items-center h-[25%] w-full p-5'>
        <View
          style={{
            width: 100,
          }} className=' justify-center items-center rounded-full' >

          <Image
            source={{ uri: avatar }}
            style={{ width: '100%', height: '100%', borderRadius: 100 }}
          />
        </View>

      </View>) : null}
      {userID ? (<View>
        <View className='p-0 items-center'>
          <Text className='font-bold text-lg text-black p-3'>
            {fullname}
          </Text>
          <Text>
            {email}
          </Text>
        </View>


        <TouchableOpacity className='w-[60%] pt-5 ' onPress={() =>
          navigation.navigate('CategoryDetails', {
            categoryId: 25,
          })
        }>
          <View className='flex-row justify-between items-center w-full'>
            <Text className='text-base font-semibold'>Cập nhật hồ sơ</Text>
            <Ionic
              name='chevron-forward-outline'
              size={20}
              color="black"
            />
          </View>

        </TouchableOpacity>

        {/* logout */}
        <View className='items-center'>
          <TouchableOpacity
            className="bg-white p-5 rounded-md flex-row "
            onPress={showWarningLogout}>
            <Ionic
              name='exit-outline'
              size={24}
              color="red"
            />
            <Text className="text-red-400 text-base  pl-2">Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>) : (<View className='items-center'>
        <TouchableOpacity
          className="bg-white p-5 rounded-md flex-row "
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Ionic
            name='log-in-outline'
            size={24}
            color="black"
          />
          <Text className="text-black text-base  pl-2">Đăng nhập</Text>
        </TouchableOpacity>
      </View>)}
      <Spinner
        visible={isLoading}
        animation="fade"
        textContent=""
        textStyle={{ color: 'white', fontSize: 15 }}
      />
    </View>
  )
}