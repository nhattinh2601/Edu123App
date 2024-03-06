import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import courseImage from '../image/cv-1_m.png';
import slideshow1 from '../image/slideshow_1.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faShoppingCart,
  faStar,
  faHome,
  faSearch,
  faBook,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

function Course() {
  return (
    <View className="w-[40%] h-[100%] ml-3 mr-3  mt-0 mb-0  flex flex-col border-0 border-solid border-gray-300 w-50 h-50 bg-white  rounded items-center">
      <Image
        className="w-full h-[40%]"
        source={courseImage} // Sử dụng đường dẫn tương đối
      />
      <Text className="text-base font-bold  text-black" style={{alignSelf: 'flex-start'}}>
        Thành thạo Canvas trong 21 ngày 
      </Text>
      <Text style={{alignSelf: 'flex-start'}}> Nguyễn Nhật Tính </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
        }}>
        <Rating ratingCount={5} imageSize={15} startingValue={4} />
        <Text> (10)</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'flex-start'}} >
        <Text className="text-base font-bold" >298.000đ </Text>
        <Text className="text-sm line-through">500.000đ</Text>
      </View>
    </View>
  );
}
const {height} = Dimensions.get('window');
export default function HomePage() {
  return (
    <View className="flex flex-col justify-center items-center">
      <ScrollView className="w-full h-[94%] ">
      <View
          className="w-full  bg-green-200 ml-2 mr-2  mt-0 mb-0 flex flex-row justify-center items-center"
          style={{height: 0.25 * height}}>
            <Image
        className="w-full h-full" resizeMode="stretch"
        source={slideshow1} // Sử dụng đường dẫn tương đối
      />
          </View>
          <Text className="text-xl font-bold ml-5">Top bán chạy</Text>
        <View
          className="w-full  m-0 p-0 border-0 flex flex-row "
          style={{height: 0.25 * height}}>
          <Course /> 
          <Course />
          <Course />
        </View>
        <Text className="text-xl font-bold ml-5">Đang khuyến mãi</Text>
        <View
          className="w-full  m-0 p-0 border-0 flex flex-row "
          style={{height: 0.25 * height}}>
          <Course /> 
          <Course />
          <Course />
        </View>
        <Text className="text-xl font-bold ml-5">Học nhiều</Text>
        <View
          className="w-full  m-0 p-0 border-0 flex flex-row "
          style={{height: 0.25 * height}}>
          <Course /> 
          <Course />
          <Course />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 44,
    backgroundColor: '#ececec',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
