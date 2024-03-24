import Ionic from 'react-native-vector-icons/Ionicons';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axiosClient from '../../api/axiosClient';
import { Rating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faStar
} from '@fortawesome/free-solid-svg-icons';
import Video from 'react-native-video';
const { width, height } = Dimensions.get('window');

const CourseStudy = ({ route, navigation }) => {
  const { courseId, title, user_name, image, price, promotional_price, description, sold, rating, userId } = route.params;
  const numericRating = parseInt(rating);
  const [teacherData, setTeacherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lessionData, setLessionData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
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

  const loadTeacherData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/users/' + userId);
      setIsLoading(false);
      setTeacherData(response.data);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const loadLessionData = async () => {
    try {
      setIsLoading(true);
      const videoResponse = await axiosClient.get(`/videos/course=${courseId}`);
      setIsLoading(false);
      const videoList = videoResponse.data;
      const VideoData = videoList.filter((item) => !item.isDeleted);
      setLessionData(VideoData);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const loadReviewData = async () => {
    try {
      setIsLoading(true);
      const reviewResponse = await axiosClient.get(`/reviews/course=${courseId}`);
      setIsLoading(false);
      setReviewData(reviewResponse.data);
    } catch (error) {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    loadData();
    loadTeacherData();
    loadLessionData();
    loadReviewData();
  }, []);


  return (
    <View className="flex flex-col h-full justify-center items-center">
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
      
      <View className='w-[80%] h-[20%]'>
         
            <Video
        source={{ uri: 'http://res.cloudinary.com/dqptxftlv/video/upload/v1704294656/bksdl3wcgwoacuup2ihl.mp4' }} // Đường dẫn của video
        style={styles.video}
        resizeMode="cover"
        paused={false}
        repeat
      />
      </View>   

            {/* danh sách bài học thì đùng scroolView */}
            <ScrollView>
              
            </ScrollView>
    </View>
  );
};

export default CourseStudy;

const styles = StyleSheet.create({  
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },  
});