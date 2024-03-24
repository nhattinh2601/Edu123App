import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../api/axiosClient';
import Spinner from "react-native-loading-spinner-overlay";
import CourseStudy from "../Course/CourseStudy";
import Ionic from 'react-native-vector-icons/Ionicons';

const Study = ({ navigation }) => {
        const [registeredCourses, setRegisteredCourses] = useState([]);
        const [userID, setUserID] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        const loadDataCourse = async () => {
                try {
                        const userID = await AsyncStorage.getItem('UserId');
                        if (userID) {
                                setIsLoading(true);
                                setUserID(userID);
                                const response = await axiosClient.get(`/courseRegisters/user/${userID}`);
                                const filteredCourses = response.data.filter(
                                        course => course.active === true && course.deleted !== true && course.isActive === true && course.isDeleted !== true
                                );
                                setIsLoading(false);
                                setRegisteredCourses(filteredCourses);
                                console.log(filteredCourses);
                        } else {

                        }

                } catch (error) {
                        console.error("Error fetching registered courses:", error.message);
                        setIsLoading(false);
                }
        }

        useEffect(() => {
                loadDataCourse();
        }, []);

        return (
                <View>
                        <View className="p-1"></View>
                        {userID ? (<View>
                                {registeredCourses.map((item, index) => (
                                <View key={item.courseId}>
                                        <TouchableOpacity className="flex-row bg-white  items-start " onPress={() =>
                                                navigation.navigate('CourseStudy', {
                                                        courseId: item.course_id || item.courseId || '',
                                                        title: item.title,
                                                        user_name: item.user_name || item.name || '',
                                                        image: item.image,
                                                        price: item?.price,
                                                        promotional_price: item?.promotional_price,
                                                        description: item?.description,
                                                        sold: item?.sold,
                                                        rating: item?.rating,
                                                        userId: item.user_id || item.userId || '',
                                                })
                                        }>
                                                <View >
                                                        <Image
                                                                source={{ uri: item.image }}
                                                                style={{ width: 100, height: 50 }}
                                                                resizeMode="contain"
                                                        />
                                                </View>
                                                <View>
                                                        <Text className="font-bold text-black">Khóa học: {item.title}</Text>
                                                        <Text>Giảng viên: {item.name}</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <View className="p-1"></View>
                                </View>
                        ))}
                        <Spinner
                                visible={isLoading}
                                animation="fade"
                                textContent=""
                                textStyle={{ color: 'white', fontSize: 15 }}
                        />
                        {!registeredCourses.length && (
                                <View className="items-center justify-center">
                                        <Text>Bạn chưa có khóa học nào cả!</Text>
                                </View>
                        )}
                        </View>) : (<View className='items-center'>
                                <TouchableOpacity
                                        className="bg-white p-5 rounded-md flex-row "
                                        onPress={() => {
                                                navigation.navigate('Login');
                                        }}>
                                        <Ionic
                                                name='log-in-outline'
                                                size={24}
                                                color="black"
                                        />
                                        <Text className="text-black text-base  pl-2">Đăng nhập</Text>
                                </TouchableOpacity>
                        </View>)}
                        
                </View>
        );
}

export default Study;