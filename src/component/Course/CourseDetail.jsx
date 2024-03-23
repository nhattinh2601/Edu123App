import Ionic from 'react-native-vector-icons/Ionicons';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image, ActivityIndicator, FlatList } from 'react-native';
import axiosClient from '../../api/axiosClient';
import Spinner from "react-native-loading-spinner-overlay";
import { Rating } from 'react-native-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faStar
} from '@fortawesome/free-solid-svg-icons';

const { width, height } = Dimensions.get('window');

const CourseDetails = ({ route, navigation }) => {
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
      console.log(response.data);
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
      console.log(videoResponse.data);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const loadReviewData = async () => {
    const reviewResponse = await axiosClient.get(`/reviews/course=${courseId}`);
    setReviewData(reviewResponse.data);
    console.log(reviewResponse.data);
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
      <ScrollView className="flex-1" contentContainerStyle={{ alignItems: 'center' }}>
        {/* image couse */}
        <View
          className="w-full  mt-0 mb-0 flex flex-row justify-center items-center rounded-sm"
          style={{ height: 0.25 * height }}>
          <Image
            source={{ uri: image }} // Thay 'https://example.com/image.jpg' bằng URL của hình ảnh bạn muốn hiển thị
            className='w-full h-full' resizeMode='contain'
          />
        </View>

        {/* info course: title, start, enrollment, teacher, description */}
        <View style={{ width: '90%', marginLeft: 10, marginRight: 10, flex: 1 }}>
          <View className=' items-start '>
            <Text className='text-black font-bold text-xl'>{title}</Text>
          </View>
          <View className=' items-start'>
            <Text className='text-black text-base'>{description}</Text>
          </View>
          <View className=' items-start p-1 flex-row justify-between'>
            <Rating
              ratingCount={5}
              imageSize={15}
              startingValue={numericRating}
            />
            <Text className='pr-5'>{sold} học viên</Text>
          </View>
          <View className=''>
            <Text>Giảng viên: {user_name}</Text>
          </View>
        </View>


        {/* add to cart, mua ngay, giá tiền, giá giảm giá */}
        <View
          className="w-[90%] ml-2 mr-2 "
          style={{ height: 0.25 * height }}>

          <Text className='text-black font-bold text-xl'>{price} đ</Text>
          <Text className='text-gray  text-sm line-through'>{promotional_price} đ</Text>

          <TouchableOpacity className="items-center p-3 bg-blue-500 w-full rounded-sm" >
            <Text className="font-bold text-green">Mua ngay</Text>
          </TouchableOpacity>
          <View className='p-1'></View>
          <TouchableOpacity className="items-center p-3 bg-white w-full rounded-sm" >
            <Text className="font-bold text-green">Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>

        {/* nội dung khóa học , không giới hạn bài học cho nên ko có mặc định height*/}
        <View className='p-1'>
        </View>
        <View style={{ width: '90%', marginLeft: 10, marginRight: 10, flex: 1 }}>
          <Text className='font-semibold text-black text-lg'>Nội dung khóa học</Text>

          {/* nội dung */}
          <View>
            <View>
              {lessionData.map((video, index) => (
                <View key={video.Id} >
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>
                    <Text style={{ marginRight: 10 }}>Bài {index + 1}. {video.title}</Text>
                  </View>
                  <View className="border-b border-black w-full mt-1 mb-1 opacity-20" />
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Thông tin giảng viên */}
        <View className='p-1'></View>
        <View style={{ width: '90%', marginLeft: 10, marginRight: 10, flex: 1 }}>
          <View>
            <Text className='font-semibold text-black text-lg'>Thông tin giảng viên</Text>

            <Text className='font-semibold text-black'>{user_name}</Text>
            <View className='items-start p-2 flex-row w-[80%]'>
              <Image
                source={{ uri: teacherData?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg' }}
                style={{ width: 80, height: 80, borderRadius: 50 }}
              />
              <Text>{teacherData?.description}</Text>
              {isLoading && (
                <ActivityIndicator size="large" color="grey" />
              )}
            </View>

            <View className='items-center '>
              <TouchableOpacity style={{ alignItems: 'center', padding: 10, backgroundColor: 'white', width: '100%', borderRadius: 5, marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', color: 'green' }}>Xem hồ sơ</Text>
              </TouchableOpacity>
              <View className='p-1'></View>
            </View>
          </View>
        </View>

        {/* đánh giá và bình luận, hiển thị mặc định tầm 5 bình luận, còn lại sử dụng lazy load, ko mặc định chiều cao */}
        <View style={{ width: '90%', marginLeft: 10, marginRight: 10, backgroundColor: 'rgba(255, 192, 203, 0.5)', flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faStar} color='yellow' size={24} />
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 5 }}>{rating} xếp hạng - {reviewData.length} đánh giá</Text>
          </View>
          {/* bình luận */}
          <View>
            {reviewData.map((review, index) => (
              <View key={index} >
                <View className='items-start flex-row pl-2'>
                  <Image
                    source={{ uri: review.avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg' }}
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                  />
                  <View className='pt-1 pl-2 w-[80%]'>
                    <Text className='text-black font-bold'>{review.fullname}</Text>
                    <Text>{review.content}</Text>
                  </View>
                </View>
                <View className="border-b border-black w-full mt-1 mb-1 opacity-20" />
              </View>
            ))}
          </View>
          
          {/* hết bình luận */}

          <View className='items-center '>
            <TouchableOpacity style={{ alignItems: 'center', padding: 10, backgroundColor: 'white', width: '50%', borderRadius: 5, marginTop: 10 }}>
              <Text style={{ fontWeight: 'bold', color: 'green' }}>Xem thêm đánh giá</Text>
            </TouchableOpacity>
            <View className='p-1'></View>
          </View>

        </View>

      </ScrollView>


    </View>
  );
};

export default CourseDetails;
