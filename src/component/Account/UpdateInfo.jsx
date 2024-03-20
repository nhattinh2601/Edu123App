import { useState, useEffect } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Modal } from "react-native"
import Spinner from 'react-native-loading-spinner-overlay';
import axiosClient from '../../api/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                        console.log(response.data);
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
                <TouchableOpacity onPress={handleUpdate}
                        className="w-[30%] bg-blue-500 rounded-lg h-12 flex items-center justify-center mt-5 mb-5"
                >
                        <Text className="text-white">Cập nhật</Text>
                </TouchableOpacity>
        </View>
}

export default UpdateInfo;