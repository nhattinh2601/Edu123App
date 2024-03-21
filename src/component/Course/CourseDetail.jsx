import Ionic from 'react-native-vector-icons/Ionicons';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axiosClient from '../../api/axiosClient';
import Spinner from "react-native-loading-spinner-overlay";

const CourseDetails = ({ route, navigation }) => {
  const { courseId } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('courses/' + courseId);
      setIsLoading(false);
      console.log(response.data);

    } catch (error) {
      setIsLoading(false);

    }

  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View className="flex flex-col justify-center items-center">
      {/* tabheader */}
      <View className="justify-center bg-white h-10 w-full">
        <View className="mr-3 ml-3 p-0 items-end justify-end flex-row justify-between">

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => {
              navigation.goBack();
            }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Ionic name="arrow-back-outline" size={36} />
              </View>
            </TouchableOpacity>


          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Cart');
            }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Ionic name="cart-outline" size={36} />
              </View>
            </TouchableOpacity>


          </View>

        </View>
      </View>
      {/* content */}
      
      <Text>CourseDetails {courseId}</Text>
      <Spinner
        visible={isLoading}
        animation="fade"
        textContent=""
        textStyle={{ color: 'white', fontSize: 15 }}
      />
    </View>
  );
};

export default CourseDetails;
