import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import axiosClient from '../../api/axiosClient';
import {useNavigation} from '@react-navigation/native';
import logo from '../../image/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionic from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      if (!username.includes('@')) {
        setNotification('Email không phù hợp định dạng!');
        setIsModalVisible(true);
        return;
      }

      if (password.length < 6) {
        setNotification('Mật khẩu phải có ít nhất 6 ký tự');
        setIsModalVisible(true);
        return;
      }
      setIsLoading(true);
      const response = await axiosClient.post('/auth/login', {
        email: username,
        password: password,
      });
      setIsLoading(false);
      if (response.status === 200) {
        // await AsyncStorage.setItem('username', username);
        // await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        const Id = response.data.UserProfileDto.Id;
        await AsyncStorage.setItem('UserId', Id.toString());
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        navigation.navigate('Home');
        // navigation.navigate('User');
      } else {
        setNotification('Có lỗi xảy ra vui lòng thử lại sau!');
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response.data;
      setNotification(errorMessage);

      setIsModalVisible(true);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register'); // Điều hướng đến màn hình đăng ký
  };

  const navigateToForgetPassword = () => {
    navigation.navigate('ForgetPassword'); // Điều hướng đến màn hình đăng ký
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="w-[80%] h-[20%]  items-center bg-slate-400">
        <Image
          source={logo}
          resizeMode="contain"
          className="flex-1 items-center justify-center"
        />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base">Email</Text>
      </View>
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base">Mật khẩu</Text>
      </View>
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          secureTextEntry={!showPassword}
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)}
        />
        <Ionic
          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
          size={20}
          color="black"
          //  style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View className="flex-row justify-between items-center w-[80%] mb-20">
        <TouchableOpacity onPress={navigateToRegister}>
          <Text className="text-black">Đăng ký tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToForgetPassword}>
          <Text className="text-black">Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} transparent>
        <View
          className="flex-1 items-center justify-center"
          style={{backgroundColor: '#00000099'}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              width: 300,
              height: 150,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#000',
            }}>
            <View className="p-5">
              <Text className="font-bold text-lg text-black">Thông báo</Text>
              <Text className="text-base text-black">{notification}</Text>
            </View>
            <TouchableOpacity
              className="items-end p-3"
              onPress={() => setIsModalVisible(false)}>
              <Text className="font-bold text-green">Đồng Ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Spinner
        visible={isLoading}
        animation="fade"
        textContent=""
        textStyle={{color: 'white', fontSize: 15}}
      />
      <TouchableOpacity
        className="w-[80%] bg-blue-500 rounded-lg h-12 flex items-center justify-center mt-5 mb-5"
        onPress={handleLogin}>
        <Text className="text-white">Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
