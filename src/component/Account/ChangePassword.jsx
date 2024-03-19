import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import axiosClient from "../../api/axiosClient";
import { useNavigation } from '@react-navigation/native';
import logo from "../../image/logo.png";
import Spinner from "react-native-loading-spinner-overlay";
import Ionic from 'react-native-vector-icons/Ionicons';


const ChangePassword = () => {



  const [username, setUsername] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [renewpassword, setReNewPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);

  const navigation = useNavigation();

  const handleChangePassword = async () => {
    try {

      if (!username.includes("@")) {
        setNotification("Email không phù hợp định dạng!");
        setIsModalVisible(true)
        return;
      } else if (oldpassword.length < 6 || newpassword.length < 6 || renewpassword.length < 6) {
        setNotification("Mật khẩu phải có ít nhất 6 ký tự");
        setIsModalVisible(true)
        return;
      } else if (newpassword !== renewpassword) {
        setNotification("Mật khẩu mới không trùng nhau!");
        setIsModalVisible(true);
        return;
      }
      setIsLoading(true);
      const response = await axiosClient.post("/auth/change-password", {
        email: username,
        oldPassword: oldpassword,
        newPassword: newpassword,
      });
      setIsLoading(false);
      if (response.status === 200) {
        setNotification("Cập nhật thành công!");
        setIsModalVisible(true);
        // navigation.navigate('User');
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
      <View className="w-[75%] h-[15%]  items-center">
        <Image source={logo} resizeMode="contain" className="flex-1 items-center justify-center" />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base" >Email</Text>
      </View>
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base" >Mật khẩu cũ</Text>
      </View>
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          secureTextEntry={!showOldPassword}
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setOldPassword(text)}
        />
        <Ionic
          name={showOldPassword ? 'eye-outline' : 'eye-off-outline'}
          size={20}
          color="black"
          //  style={styles.icon} 
          onPress={() => setShowOldPassword(!showOldPassword)}
        />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base" >Mật khẩu mới</Text>
      </View>
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          secureTextEntry={!showNewPassword}
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setNewPassword(text)}
        />
        <Ionic
          name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
          size={20}
          color="black"
          //  style={styles.icon} 
          onPress={() => setShowNewPassword(!showNewPassword)}
        />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base" >Nhập lại mật khẩu mới</Text>
      </View>
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          secureTextEntry={!showReNewPassword}
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setReNewPassword(text)}
        />
        <Ionic
          name={showReNewPassword ? 'eye-outline' : 'eye-off-outline'}
          size={20}
          color="black"
          //  style={styles.icon} 
          onPress={() => setShowReNewPassword(!showReNewPassword)}
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
            <TouchableOpacity className="items-end p-3" onPress={() => setIsModalVisible(false)}>
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
      <TouchableOpacity className="w-[80%] bg-blue-500 rounded-lg h-12 flex items-center justify-center mt-5 mb-5" onPress={handleChangePassword}>
        <Text className="text-white">Cập nhật</Text>
      </TouchableOpacity>

    </View>
  );
};


export default ChangePassword;
