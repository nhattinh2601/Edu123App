import Ionic from 'react-native-vector-icons/Ionicons';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image, Linking, ActivityIndicator } from 'react-native';
import axiosClient from '../../api/axiosClient';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faStar
} from '@fortawesome/free-solid-svg-icons';
import Video from 'react-native-video';
import YoutubePlayer from "react-native-youtube-iframe";
import { height } from '@fortawesome/free-solid-svg-icons/fa0';


const CourseStudy = ({ route, navigation }) => {
  const { courseId, title, user_name, image, price, promotional_price, description, sold, rating, userId } = route.params;
  const numericRating = parseInt(rating);

  const [isLoading, setIsLoading] = useState(false);

  // bình luận: thêm, sửa, xóa, bình luận
  const [notification, setNotification] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedOption, setSelectedOption] = useState('lectures');
  ;

  const [videoURL, setVideoURL] = useState('');
  const [titleVideo, setTitleVideo] = useState('');
  const [lessionData, setLessionData] = useState([]);
  const [comments, setComments] = useState([]);
  const [documentData, setDocumentData] = useState([]);
  const [teacherData, setTeacherData] = useState(null);

  // chỗ này cho vào loadURL, dựa vào id của video để lấy chi viết video và bình luận 
  const [lessionCurrentID, setLessionCurrentID] = useState();
  // chỉ mục để lấy được title của video trong mảng video và tô màu cho video đang xem
  const [lessionIndex, setLessionIndex] = useState(0)

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

  const loadLessionandCommentData = async () => {
    try {
      if (lessionCurrentID === undefined || lessionCurrentID === null) {
        setIsLoading(true);
        const videoResponse = await axiosClient.get(`/videos/course=${courseId}`);
        setIsLoading(false);
        const videoList = videoResponse.data;
        const VideoData = videoList.filter((item) => !item.isDeleted);
        setLessionData(VideoData);

        //setVideoURL
        setVideoURL(VideoData[0].video_filepath);
        console.log(VideoData[0].video_filepath);
        //setTitleVideo
        setTitleVideo(VideoData[0].title);

        //loadCommentData
        const firstLessionID = videoList?.[0]?.Id;
        loadCommentData(firstLessionID);
      } else {

      }
    } catch (error) {
      setIsLoading(false);
    }
  }


  const loadCommentData = async (videoID) => {
    try {
      const response = await axiosClient.get(`/comments/video=${videoID}`);
      const commentsData = response.data;
      const filteredComment = commentsData.filter((comment) => !comment.isDeleted);
      setComments(filteredComment);
    }
    catch (error) {

    }
  }

  const loadDocumentData = async () => {
    try {
      const documentResponse = await axiosClient.get(
        `/documents/course=${courseId}`
      );
      setDocumentData(documentResponse.data);      
    } catch (error) {
      setIsLoading(false);
    }

  }


  useEffect(() => {
    loadTeacherData();
    loadLessionandCommentData();
    loadDocumentData();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

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

      {/* Video */}
      <View className=' w-full h-[30%] flex-1 pb-3'>
        {/* <Video
          source={{ uri: 'http://res.cloudinary.com/dqptxftlv/video/upload/v1704294656/bksdl3wcgwoacuup2ihl.mp4' }} // Đường dẫn của video
          style={styles.video}
          resizeMode="cover"
          paused={false}
          repeat
        />
      </View>
      <View className='w-[80%] h-[20%]'>
         */}
         <YoutubePlayer
          height={height*0.35}
          play={true}
          videoId={"YaXJeUkBe4Y"}
        // onChangeState={onStateChange}
        />
        {/* <View>
          <Text>{videoURL}</Text>
        </View> */}
      </View>

      {/* title video + username teacher */}
      <View style={{ width: '90%', marginLeft: 10, marginRight: 10 }}>
        <View className='items-start'>
          {lessionData.length > 0 ? (
            <Text className='text-black font-semibold text-base'>{titleVideo}</Text> // Hiển thị title của phần tử đầu tiên
          ) : (
            <ActivityIndicator size="small" color="grey" />
          )}
          <Text className='text-gray text-base'>{user_name}</Text>
        </View>
      </View>

      <ScrollView className='w-[90%]'>
        {/* Các tùy chọn: bài giảng, bình luận, tài liệu */}
        <View className=' flex-row justify-between w-full p-2 pl-0 pr-0' >
          <TouchableOpacity onPress={() => setSelectedOption('lectures')}>
            <Text className='text-black pb-2' style={{ fontWeight: selectedOption === 'lectures' ? 'bold' : 'normal' }}>Bài giảng</Text>
            <View style={{ backgroundColor: 'black', borderWidth: selectedOption === 'lectures' ? 0.5 : 0, opacity: 0.5 }}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedOption('comments')}>
            <Text className='text-black pb-2' style={{ fontWeight: selectedOption === 'comments' ? 'bold' : 'normal' }}>Bình luận</Text>
            <View style={{ backgroundColor: 'black', borderWidth: selectedOption === 'comments' ? 0.5 : 0, opacity: 0.5 }}></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedOption('documents')}>
            <Text className='text-black pb-2' style={{ fontWeight: selectedOption === 'documents' ? 'bold' : 'normal' }}>Tài liệu</Text>
            <View style={{ backgroundColor: 'black', borderWidth: selectedOption === 'documents' ? 0.5 : 0, opacity: 0.5 }}></View>
          </TouchableOpacity>
        </View>

        {/* Phần hiển thị nội dung tương ứng */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          {selectedOption === 'lectures' && (
            <View>
              {/* Hiển thị nội dung của bài giảng */}
              <View>
                <View>
                  {lessionData.map((video, index) => (
                    <View key={video.Id} >
                      <TouchableOpacity className='flex-row items-center mb-0'
                        style={{ backgroundColor: index === lessionIndex ? 'gray' : 'white' }}
                        onPress={() => {
                          setLessionIndex(index);  // để tô màu video đang xem
                          setTitleVideo(lessionData?.[index].title);
                          setVideoURL(lessionData?.[index].video_filepath);
                          loadCommentData(video.Id);
                        }}
                      >
                        <Text style={{ marginRight: 10 }}>Bài {index + 1}. {video.title}</Text>
                      </TouchableOpacity>
                      <View className="border-b border-black w-full mt-1 mb-1 opacity-20" />
                    </View>
                  ))}
                  {isLoading && (
                    <ActivityIndicator size="large" color="grey" />
                  )}
                </View>
              </View>
            </View>
          )}
          {selectedOption === 'comments' && (
            <View>
              {/* Hiển thị nội dung của bình luận */}
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <View key={index} >
                    <View className='items-start flex-row pl-2'>
                      <Image
                        source={{ uri: comment.avatar || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg' }}
                        style={{ width: 40, height: 40, borderRadius: 50 }}
                      />
                      <View className='pt-1 pl-2 w-[80%]'>
                        <Text className='text-black font-bold'>{comment.fullname}</Text>
                        <Text>{formatDate(comment.create)}</Text>

                      </View>
                    </View>
                    <Text className='pl-2 pr-2'>{comment.content}</Text>
                    <View className="border-b border-black w-full mt-1 mb-1 opacity-20" />
                  </View>
                ))
              ) : (<Text> Chưa có bình luận nào. </Text>)}
            </View>
          )}
          {selectedOption === 'documents' && (
            <View>
              {/* Hiển thị nội dung của tài liệu */}
              {documentData.length > 0 ? (
                documentData.map((document, index) => (
                  <View key={index} >
                    <View className='items-start flex-row pl-2'>
                      <View className='pt-1 w-full'>
                        <Text className='text-black font-bold'>{document.title}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(document.file_path)}>
                          <Text className='text-blue-600'>{document.file_path}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View className="border-b border-black w-full mt-1 mb-1 opacity-20" />
                  </View>
                ))
              ) : (<Text> Chưa có bình luận nào. </Text>)}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CourseStudy;

