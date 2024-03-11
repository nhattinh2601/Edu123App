import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import axiosClient from "../../api/axiosClient";
import { useNavigation } from "@react-navigation/native";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [resetPasswordStatus, setResetPasswordStatus] = useState("idle");
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigation = useNavigation();

  const handleChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = () => {
    if (!isEmailSubmitted) {
      sendOtp();
    } else {
      confirmResetPassword();
    }
  };

  const sendOtp = () => {
    setResetPasswordStatus("loading");

    axiosClient
      .post(`/auth/forgetpassword/sendotp/${email}`)
      .then((response) => {
        setIsEmailSubmitted(true);
        setResetPasswordStatus("success");
        setSuccessMessage("Mã xác nhận đã được gửi thành công.");
        console.log(response.data);
      })
      .catch((error) => {
        setResetPasswordStatus("error");
        setResetPasswordError(error.response.data);
        console.error(error.response.data);
      });
  };

  const confirmResetPassword = () => {
    if (newPassword.length < 6) {
      setResetPasswordStatus("error");
      setResetPasswordError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetPasswordStatus("error");
      setResetPasswordError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setResetPasswordStatus("loading");

    axiosClient
      .post(`/auth/confirm-reset-password/${email}`, {
        confirmationCode,
        newPassword,
      })
      .then((response) => {
        setResetPasswordStatus("success");
        setSuccessMessage(
          "Đổi mật khẩu thành công. Đang chuyển hướng đến trang đăng nhập..."
        );
        setTimeout(() => {
          setSuccessMessage("");
          navigation.navigate("Login");
        }, 2000);
        console.log(response.data);
      })
      .catch((error) => {
        setResetPasswordStatus("error");
        setResetPasswordError(error.response.data);
        console.error(error.response.data);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.title}>
              {isEmailSubmitted
                ? "Xác nhận mã và Đổi mật khẩu"
                : "Quên mật khẩu"}
            </Text>
            {!isEmailSubmitted && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={handleChange}
                  keyboardType="email-address"
                />
              </View>
            )}
            {isEmailSubmitted && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mã xác nhận</Text>
                  <TextInput
                    style={styles.input}
                    value={confirmationCode}
                    onChangeText={(text) => setConfirmationCode(text)}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mật khẩu mới</Text>
                  <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry
                  />
                </View>
              </>
            )}
            {resetPasswordError !== "" && (
              <Text style={styles.error}>{resetPasswordError}</Text>
            )}
            {successMessage !== "" && (
              <Text style={styles.success}>{successMessage}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={resetPasswordStatus === "loading"}
            >
              <Text style={styles.buttonText}>
                {resetPasswordStatus === "loading"
                  ? "Đang xử lý..."
                  : isEmailSubmitted
                  ? "Xác nhận và Đổi mật khẩu"
                  : "Gửi mã xác nhận"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
  },
  cardBody: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  success: {
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ForgetPassword;
