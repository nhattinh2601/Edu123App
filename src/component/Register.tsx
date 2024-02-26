import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axiosClient from '../api/axiosClient';
import { useNavigation } from '@react-navigation/native'; 

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigation = useNavigation(); 
  const navigateToLogin = () => {
    navigation.navigate('Login'); // Điều hướng đến màn hình đăng ký
  };

  const handleRegister = async () => {
    try {
      setLoginError("");
      setLoginSuccess("");
      setUsernameError("");
      setPasswordError("");
      setPhoneError("");
      setFullnameError("");

      if (fullname.length < 3) {
        setFullnameError("Tên người dùng phải có ít nhất 3 ký tự");
        return;
      }
      if (!email.includes("@gmail.com")) {
        setUsernameError("Tên người dùng phải có định dạng @gmail.com");
        return;
      }
      

      if (password.length < 6) {
        setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
        return;
      }

      if (phone.length >=9 && phone.length <= 11) {
        setPhoneError("Số điện thoại phải từ 9 đến 10 số");
        return;
      }

      const response = await axiosClient.post("/auth/register", {
        fullname: fullname,
        email: email,
        password: password,
        phone: phone,
      });

      console.log("Register successful", response.data);

      setLoginSuccess("Đăng kí thành công!");
    } catch (error) {
      setLoginError("Đăng kí thất bại!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Đăng kí</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Họ và tên"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFullname(text)}
        />
      </View>
      <Text style={styles.errorText}>{fullnameError}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <Text style={styles.errorText}>{usernameError}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Số điện thoại"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <Text style={styles.errorText}>{phoneError}</Text>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Mật khẩu"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Text style={styles.errorText}>{passwordError}</Text>
      <Text style={styles.errorText}>{loginError}</Text>
      <Text style={[styles.errorText, { color: 'green' }]}>{loginSuccess}</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
        <Text style={styles.loginText}>Đăng kí</Text>
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
    color: "white",
    marginTop: 5,
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
