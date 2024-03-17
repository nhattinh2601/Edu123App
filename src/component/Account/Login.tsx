import React, { useState } from "react"; 
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Dimensions 
} from "react-native";
import axiosClient from "../../api/axiosClient";
import { useNavigation } from '@react-navigation/native'; 
import logo from "../../image/logo.png";

const {width, height} = Dimensions.get('window');

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation(); 

  const handleLogin = async () => {
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

  const navigateToRegister = () => {
    navigation.navigate('Register'); // Điều hướng đến màn hình đăng ký
  };

  const navigateToForgetPassword = () => {
    navigation.navigate('ForgetPassword'); // Điều hướng đến màn hình đăng ký
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="w-[80%] h-[20%]  items-center bg-slate-400">
        <Image source={logo} resizeMode="contain" className="flex-1 items-center justify-center"/>
      </View>
      <View className="items-start w-full">
        <Text className="font-bold text-black ml-10 text-base" >Email</Text>
      </View>
      <View className="w-[80%] bg-white border opacity-80Nguy rounded-lg h-12 mb-5 flex-row items-center px-5">        
        <TextInput
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View className="items-start w-full">
        <Text className="font-bold text-black ml-10 text-base" >Mật Khẩu</Text>
      </View>      
      <View className="w-[80%] bg-white border opacity-80Nguy rounded-lg h-12 mb-5 flex-row items-center px-5">
        <TextInput
          secureTextEntry
          className="h-12 text-black ml-0 flex-1"
          placeholderTextColor="#003f5c"          
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Text style={styles.errorText}>{usernameError}</Text>
      <Text style={styles.errorText}>{passwordError}</Text>
      <TouchableOpacity style={styles.checkboxContainer}>
      <TouchableOpacity onPress={navigateToRegister}>
        <Text className="text-black">Đăng ký tài khoản</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={navigateToForgetPassword}>
          <Text className="text-black">Quên mật khẩu?</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <Text style={styles.errorText}>{loginError}</Text>
      <Text style={[styles.errorText, { color: 'green' }]}>{loginSuccess}</Text>
      <TouchableOpacity className="w-[80%] bg-blue-500 rounded-lg h-12 flex items-center justify-center mt-5 mb-5" onPress={handleLogin}>
        <Text className="text-white">Đăng nhập</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 10,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,    
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: "white",
    marginLeft: 10,
    flex: 1,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  loginText: {
    color: "white",
  },
  signupText: {
    color: "white",
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    color: "white",
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    textAlign: "center",
  },
  image: {
    width: 150,
    height: 250,
    resizeMode: 'cover',
  }
});

export default Login;
