import React from 'react';
import { View, Image, Text } from 'react-native';
import { Rating } from 'react-native-ratings';
import courseImage from "../image/cv-1_m.png"; 

function Course() {
  return (
    <View style={{borderWidth: 2, borderColor: 'gray', width: 100, height: 120, borderRadius: 8}}>
      <Image
        source={courseImage} // Sử dụng đường dẫn tương đối
        style={{ width: 96, height: 54, borderRadius: 8 }}
      />

      <Text style={{fontSize: 10, textAlign: 'center'}}>
        Thành thạo Canvas trong 21 ngày
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Rating
          ratingCount={5}
          imageSize={15}
          startingValue={4}
        />
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
    <View style={{flex: 1}}>
      <Course />
    </View>
  );
}
