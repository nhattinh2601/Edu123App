import React, { useState } from "react"; 
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,   
  Image, 
  Dimensions 
} from "react-native";
import axiosClient from "../../api/axiosClient";
import { useNavigation } from '@react-navigation/native'; 
import logo from "../../image/logo.png";

const {width, height} = Dimensions.get('window');

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [renewpassword, setReNewPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation(); 

  const handleChangePassword = async () => {
    try {
      setLoginError("");
      setLoginSuccess("");
      setUsernameError("");
      setPasswordError("");

      if (!username.includes("@")) {
        setUsernameError("Tên người dùng phải có định dạng @");
        return;
      }

      if (password.length < 6) {
        setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }

      const response = await axiosClient.post("/auth/login", {
        email: username,
        password: password,
      });

      console.log("Login successful", response.data);

      setLoginSuccess("Đăng nhập thành công!");
    } catch (error) {
      setLoginError("Đăng nhập thất bại!");
    }
  };
  

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="w-[75%] h-[15%]  items-center">
        <Image source={logo} resizeMode="contain" className="flex-1 items-center justify-center"/>
      </View>
      <View className="w-full  items-center">
        <Text className="font-bold text-black text-xl" >Đổi mật khẩu</Text>
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
          secureTextEntry
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"          
          onChangeText={(text) => setOldPassword(text)}
        />
      </View>
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base" >Mật khẩu mới</Text>
      </View>      
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          secureTextEntry
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"          
          onChangeText={(text) => setNewPassword(text)}
        />
      </View>  
      <View className="items-start w-full">
        <Text className=" text-black ml-10 text-base" >Nhập lại mật khẩu mới</Text>
      </View>      
      <View className="w-[80%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
        <TextInput
          secureTextEntry
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"          
          onChangeText={(text) => setReNewPassword(text)}
        />
      </View>  
      
      <TouchableOpacity className="w-[80%] bg-blue-500 rounded-lg h-12 flex items-center justify-center mt-5 mb-5" onPress={handleChangePassword}>
        <Text className="text-white">Cập nhật</Text>
      </TouchableOpacity>
      
    </View>
  );
};


export default ChangePassword;
