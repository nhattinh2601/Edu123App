import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import axiosClient from "../api/axiosClient";
import { useNavigation } from '@react-navigation/native'; 

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

      if (!username.includes("@gmail.com")) {
        setUsernameError("Tên người dùng phải có định dạng @gmail.com");
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
    <View style={styles.container}>
      <Text style={styles.logo}>EDU123</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <Text style={styles.errorText}>{usernameError}</Text>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Text style={styles.errorText}>{passwordError}</Text>
      <TouchableOpacity style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRememberPassword(!rememberPassword)}
        >
          <Text style={styles.label}>Lưu mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToForgetPassword}>
          <Text style={styles.label}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <Text style={styles.errorText}>{loginError}</Text>
      <Text style={[styles.errorText, { color: 'green' }]}>{loginSuccess}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.signupText}>Đăng ký tài khoản</Text>
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
});

export default Login;
