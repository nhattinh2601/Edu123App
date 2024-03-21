import { useState, useEffect } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Modal, Alert, StyleSheet, Pressable, Animated, } from "react-native"
import Spinner from 'react-native-loading-spinner-overlay';
import axiosClient from '../../api/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionic from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const HEIGHT = 220;
const OVERDRAG = 20;
const BACKDROP_COLOR = "rgba(0, 0, 0, 0.3)";

const AninatedPressable = Animated.createAnimatedComponent(Pressable);

const UpdateInfo = ({ route, navigation }) => {
        const { fullname } = route.params;
        const { phone } = route.params;
        const { avatar } = route.params;

        const [fullnameUpdate, setFullnameUpdate] = useState('');
        const [phoneUpdate, setPhoneUpdate] = useState('');
        const [avatarUpdate, setAvatarUpdate] = useState('');
        const [userID, setUserID] = useState('');

        const [isLoading, setIsLoading] = useState(false);
        const [notification, setNotification] = useState('');
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [isOpen, setOpen] = useState(false);

        const openCameraLib = async () => {
                console.log("Press");
                const result = await launchCamera();
                console.log("Result=>>", result);
        }

        const toggleSheet = () => {
                setOpen(!isOpen);
        };

        const getData = async () => {
                try {
                        const userID = await AsyncStorage.getItem('UserId');
                        setUserID(userID);
                } catch (e) {
                        console.log('Lỗi khi lấy dữ liệu hoặc không có thông tin người dùng!', e);
                }
        }

        const handleUpdate = async () => {
                const trimmedName = fullnameUpdate.trim();
                const fieldsToUpdate = {
                        fullname: trimmedName,
                        phone: phoneUpdate,
                };
                try {
                        if (!fullnameUpdate) {
                                setNotification("Tên không được để trống!");
                                setIsModalVisible(true);
                        }
                        setIsLoading(true);

                        const response = await axiosClient.patch('/users/' + userID,
                                fieldsToUpdate
                        );
                        // console.log(response.data);
                        setIsLoading(false);
                        if (response.status === 200) {
                                setNotification("Cập nhật thành công!");
                                setIsModalVisible(true);
                        }
                } catch (error) {
                        setIsLoading(false);
                        // const errorMessage = error.response.data;
                        // setNotification(errorMessage);
                        setNotification("Đã xảy ra lỗi vui lòng thử lại sau!");
                        setIsModalVisible(true);
                }
        }

        const changeData = () => {
                setFullnameUpdate(fullname);
                setPhoneUpdate(phone);
                setAvatarUpdate(avatar);
        }

        useEffect(() => {
                changeData();
                getData();
        }, []);

        return <View className=' flex-1 items-center bg-white'>
                {avatarUpdate ? (<View className='items-center h-[25%] w-full p-5'>
                        <View
                                style={{
                                        width: 100,
                                }} className=' justify-center items-center rounded-full' >

                                <Image
                                        source={{ uri: avatarUpdate }}
                                        style={{ width: '100%', height: '100%', borderRadius: 100 }}
                                />
                                <View
                                        style={{
                                                position: 'absolute', // Đặt icon ở vị trí tuyệt đối để nó có thể "nổi" lên trên hình ảnh
                                                bottom: 0, // Đẩy icon xuống dưới cùng
                                                right: 0, // Đẩy icon sang phải
                                                width: 30, // Kích thước của icon, bạn có thể điều chỉnh cho phù hợp
                                                height: 30, // Kích thước của icon
                                                justifyContent: 'center', // Căn giữa icon theo chiều dọc
                                                alignItems: 'center', // Căn giữa icon theo chiều ngang
                                                borderRadius: 15, // Làm tròn icon
                                                backgroundColor: 'lightgrey', // Màu nền của icon, bạn có thể thay đổi
                                        }}
                                >
                                        <Ionic
                                                name="camera-outline"
                                                size={24}
                                                onPress={() => {
                                                        setOpen(!isOpen);
                                                }}
                                        />
                                </View>
                        </View>

                </View>) : null}
                <View className="w-[60%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
                        <Text></Text>
                        <TextInput
                                className="h-12 text-black ml-0 flex-1"
                                placeholderTextColor="#003f5c"
                                editable={true}
                                placeholder="Họ và tên"
                                onChangeText={text => setFullnameUpdate(text)}
                        >{fullnameUpdate}</TextInput>
                </View>
                <View className="w-[60%] bg-white border border-gray-400 rounded-sm h-10 mb-5 flex-row items-center px-5">
                        <TextInput
                                className="h-12 text-black ml-0 flex-1"
                                placeholderTextColor="#003f5c"
                                placeholder="Số điện thoại"
                                onChangeText={text => setPhoneUpdate(text)}
                        >{phoneUpdate}</TextInput>
                </View>
                <Modal visible={isModalVisible} transparent>
                        <View
                                className="flex-1 items-center justify-center"
                                style={{ backgroundColor: '#00000099' }}>
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
                        textStyle={{ color: 'white', fontSize: 15 }}
                />
                {isOpen && (
                        <>
                                <AninatedPressable style={styles.backdrop} onPress={toggleSheet} />
                                <View style={styles.sheet}>
                                        <TouchableOpacity onPress={openCameraLib}>
                                                <View className="item-center justify-center flex-row">
                                                <Text className="font-semibold text-black text-base">Mở Camera</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <View className="border-b border-black w-full mt-1 mb-1 opacity-20" />
                                        <TouchableOpacity >
                                                <View className="item-center justify-center flex-row">
                                                <Text className="font-semibold text-black text-base">Mở Thư viện</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <View className="border-b border-black w-full mt-1 mb-1 opacity-20" />
                                        <TouchableOpacity >
                                                <View className="item-center justify-center flex-row">
                                                <Text className="font-semibold text-black text-base">Xem ảnh</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <View className="border-b border-black w-full mt-1 mb-1 opacity-20" />
                                        <TouchableOpacity onPress={toggleSheet}>
                                                <View className="item-center justify-center flex-row">
                                                <Text className="font-semibold text-black text-base">Hủy</Text>
                                                </View>
                                        </TouchableOpacity>                                        
                                </View>
                        </>
                )}
                <TouchableOpacity onPress={handleUpdate}
                        className="w-[30%] bg-blue-500 rounded-lg h-12 flex items-center justify-center mt-5 mb-5"
                >
                        <Text className="text-white">Cập nhật</Text>
                </TouchableOpacity>
        </View>
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                //   backgroundColor: BACKGROUND_COLOR,
        },
        sheet: {
                backgroundColor: "white",
                padding: 16,
                height: HEIGHT*0.75,
                width: "100%",
                position: "absolute",
                bottom: -OVERDRAG * 1.1,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                zIndex: 1,
        },
        backdrop: {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: BACKDROP_COLOR,
                zIndex: 1,
        },
});

export default UpdateInfo;