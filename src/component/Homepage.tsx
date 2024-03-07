import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import courseImage from '../image/cv-1_m.png';
import slideshow1 from '../image/slideshow_1.jpg';

const {width, height} = Dimensions.get('window');
const carouseItem = require('../image/carousel.json');

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

interface CarouselItems {
  title: string;
  url: string;
  promo: string;
}

function Course() {
  return (
    <View className="w-[40%] h-[100%] ml-3 mr-3  mt-0 mb-0  flex flex-col border-0 border-solid border-gray-300 w-50 h-50 bg-white  rounded items-center">
      <Image
        className="w-full h-[40%]"
        source={courseImage} // Sử dụng đường dẫn tương đối
      />
      <Text
        className="text-base font-bold  text-black"
        style={{alignSelf: 'flex-start'}}>
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'flex-start',
        }}>
        <Text className="text-base font-bold">298.000đ </Text>
        <Text className="text-sm line-through">500.000đ</Text>
      </View>
    </View>
  );
}
export default function HomePage() {
  let flatListRef = useRef<FlatList<CarouselItems> | null>();
  const [currentIndex, setCurrentIndex] = useState(0);

  //only needed if want to know the index
  const onViewRef = useRef(({changed}: {changed: any}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({animated: true, index: index});
  };

  const renderItems: React.FC<{item: CarouselItems}> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => console.log('clicked')}
        activeOpacity={1}>
        <Image source={{uri: item.url}} style={styles.image} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>{item.title}</Text>
          <Text style={styles.footerText}>{item.promo}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex flex-col justify-center items-center">
      <ScrollView className="w-full h-[94%] ">
        <View
          className="w-full  bg-green-200 ml-2 mr-2  mt-0 mb-0 flex flex-row justify-center items-center"
          style={{height: 0.25 * height}}>
          <View style={styles.container}>
            <FlatList
              data={carouseItem}
              renderItem={renderItems}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              ref={ref => {
                flatListRef.current = ref;
              }}
              style={styles.carousel}
              viewabilityConfig={viewConfigRef}
              onViewableItemsChanged={onViewRef.current}
            />
            <View style={styles.dotView}>
              {carouseItem.map(({}, index: number) => (
                <TouchableOpacity
                  key={index.toString()}
                  style={[
                    styles.circle,
                    {backgroundColor: index == currentIndex ? 'black' : 'grey'},
                  ]}
                  onPress={() => scrollToIndex(index)}
                />
              ))}
            </View>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carousel: {
    maxHeight: 300,
  },
  image: {
    width,
    height: 250,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 40,
    alignContent: 'center',
    backgroundColor: '#000',
  },
  footerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
    marginHorizontal: 5,
  },
});
