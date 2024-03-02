import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
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
    <View
      className="border-2 border-solid border-gray-300 w-50 h-50   rounded"
      style={{width: 120, height: 120}}>
      <Image
        source={courseImage} // Sử dụng đường dẫn tương đối
        style={{width: 96, height: 54, borderRadius: 8}}
      />

      <Text style={{fontSize: 10, textAlign: 'center'}}>
        Thành thạo Canvas trong 21 ngày
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Rating ratingCount={5} imageSize={15} startingValue={4} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{fontSize: 10}}>298.000đ </Text>
        <Text style={{fontSize: 10, color: 'gray'}}>500.000đ</Text>
      </View>
    </View>
  );
}

function CourseNew() {
  return (
    <View className="w-[30%] h-[90%]  m-3 flex flex-col border-2 border-solid border-gray-300 w-50 h-50 bg-white  rounded">
      <Image
        className=""
        source={courseImage} // Sử dụng đường dẫn tương đối
        style={{width: 96, height: 54, borderRadius: 8}}
      />
      <Text style={{fontSize: 10, textAlign: 'center'}}>
        Thành thạo Canvas trong 21 ngày
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Rating ratingCount={5} imageSize={15} startingValue={4} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{fontSize: 10}}>298.000đ </Text>
        <Text style={{fontSize: 10, color: 'gray'}}>500.000đ</Text>
      </View>
    </View>
  );
}

export default function HomePage() {
  return (
    <View className="flex flex-col justify-center items-center">
      <View className="w-[90%] h-[30%] bg-white m-3 flex flex-row justify-center items-center">
      <Image
        className="w-[90%] h-[90%]"
        source={slideshow1} // Sử dụng đường dẫn tương đối
      />
      </View>
    <View className="w-[90%] h-[50%] bg-slate-300">

      <View className="w-[90%] h-[30%] bg-green-200 m-3 flex flex-row">
        <CourseNew />
        <View className="w-[30%] h-[90%] bg-blue-200 m-3 flex flex-col"></View>
        <View className="w-[30%] h-[90%] bg-blue-200 m-3 flex flex-col"></View>
      </View>
      
      </View>
        
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
