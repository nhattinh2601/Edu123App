import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import axiosClient from '../../api/axiosClient';
import { useNavigation } from '@react-navigation/native';
import logo from "../../image/logo.png";
import Ionic from 'react-native-vector-icons/Ionicons';
import Spinner from "react-native-loading-spinner-overlay";


const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const navigation = useNavigation();
  const navigateToLogin = () => {
    if (isSignUpSuccess) {
      navigation.navigate('Login'); // Điều hướng đến màn hình đăng ký
    }
  };

  const closeNotification = () => {
    setIsModalVisible(false);
  }

  const handleRegister = async () => {
    try {


      if (!fullname || fullname.trim() === '') {
        setNotification("Tên người dùng không được rỗng!");
        setIsModalVisible(true);
        return;
      }
      else if (!email.includes("@")) {
        setNotification("Định dạng email không phù hợp!");
        setIsModalVisible(true);
        return;
      }
      else if (password.length < 6) {
        setNotification("Mật khẩu phải có ít nhất 6 ký tự!");
        setIsModalVisible(true);
        return;
      }
      else if (phone.length < 9 || phone.length > 11) {
        setNotification("Số điện thoại phải từ 9 đến 11 số!");
        setIsModalVisible(true);
        return;
      }

      setIsLoading(true);
      const response = await axiosClient.post("/auth/register", {
        fullname: fullname,
        email: email,
        password: password,
        phone: phone,
      });
      setIsLoading(false);


      if (response.status === 201) {
        setNotification("Bạn đã đăng ký thành công!");
        setIsModalVisible(true);
        setIsSignUpSuccess(true);
      } else {
        setNotification("Có lỗi xảy ra vui lòng thử lại sau!");
        setIsModalVisible(true);
      }


    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response.data;
      setNotification(errorMessage);

      setIsModalVisible(true);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="w-[80%] h-[20%]  items-center bg-slate-400">
        <Image source={logo} resizeMode="contain" className="flex-1 items-center justify-center" />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base">Họ và tên</Text>
      </View>
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFullname(text)}
        />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base">Email</Text>
      </View>
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base">Số điện thoại</Text>
      </View>
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPhone(text)}
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
          onChangeText={(text) => setPassword(text)}
        />
        <Ionic
          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
          size={20}
          color="black"
          //  style={styles.icon} 
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <Modal visible={isModalVisible} transparent>
        <View className="flex-1 items-center justify-center" style={{ backgroundColor: '#00000099' }}>
          <View style={{
            backgroundColor: '#ffffff',
            width: 300,
            height: 150,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#000'
          }}>
            <View className="p-5">
              <Text className="font-bold text-lg text-black">Thông báo</Text>
              <Text className="text-base text-black">{notification}</Text>
            </View>
            <TouchableOpacity className="items-end p-3" onPress={() => {
              closeNotification();
              navigateToLogin();
            }}>
              <Text className="font-bold text-green">Đồng Ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Spinner
        visible={isLoading}
        animation="fade"
        textContent=""
        textStyle={{ color: 'white', fontSize: 15 }}
      />
      <TouchableOpacity className="w-[80%] bg-blue-500 rounded-lg h-12 flex items-center justify-center mt-5 mb-5" onPress={handleRegister}>
        <Text style={styles.loginText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.signupText}>Tôi đã có tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 10,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  signupText: {
    color: "black",
    marginTop: 0,
  },
  inputText: {
    height: 50,
    color: 'white',
    marginLeft: 10,
    flex: 1,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  loginText: {
    color: 'white',
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    textAlign: "center",
  },
});

export default Register;
