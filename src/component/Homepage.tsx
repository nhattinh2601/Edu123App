import Ionic from 'react-native-vector-icons/Ionicons';
import React, {useRef, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Animated,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import axiosClient from '../api/axiosClient';

const {width, height} = Dimensions.get('window');
const carouseItem = require('../image/carousel.json');

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

interface CarouselItems {
  title: string;
  url: string;
  promo: string;
}

const HomePage = ({navigation}) => {
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

  //Flatlist
  const [topNewCourses, setTopNewCourses] = useState([]);
  const [topSoldCourses, settopSoldCourses] = useState([]);
  const [topRatingCourses, settopRatingCourses] = useState([]);
  const [userId, setUserId] = useState();

  const WIDTH = Dimensions.get('screen').width;
  const ITEM_WIDTH = WIDTH * 0.45;
  const scrollX = useRef(new Animated.Value(0)).current;

  const [isLoading, setIsLoading] = useState(false);

  const fetchTopSold = async () => {
    try {
      setIsLoading(true);
      const cachedData = await AsyncStorage.getItem('topSoldCourses');
      if (cachedData) {
        settopSoldCourses(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        const response = await axiosClient.get(
          '/courses/get4CourseSoldRelateInfo',
        );
        settopSoldCourses(response.data);
        await AsyncStorage.setItem(
          'topSoldCourses',
          JSON.stringify(response.data),
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching top sold courses:', error);
      setIsLoading(false);
    }
  };

  const fetchTopRating = async () => {
    try {
      setIsLoading(true);
      const cachedData = await AsyncStorage.getItem('topRatingCourses');
      if (cachedData) {
        settopRatingCourses(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        const response = await axiosClient.get(
          '/courses/get4CourseRatingRelateInfo',
        );
        settopRatingCourses(response.data);
        await AsyncStorage.setItem(
          'topRatingCourses',
          JSON.stringify(response.data),
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching top rating courses:', error);
    }
  };

  const fetchTopNewCourses = async () => {
    try {
      setIsLoading(true);
      const cachedData = await AsyncStorage.getItem('topNewCourses');
      if (cachedData) {
        setTopNewCourses(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        const response = await axiosClient.get(
          '/courses/get4CourseNewRelateInfo',
        );
        setTopNewCourses(response.data);
        await AsyncStorage.setItem(
          'topNewCourses',
          JSON.stringify(response.data),
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching top new courses:', error);
    }
  };

  const deleteCatchData = async () => {
    await AsyncStorage.removeItem('topSoldCourses');
    await AsyncStorage.removeItem('topRatingCourses');
    await AsyncStorage.removeItem('topNewCourses');
  };

  const getUserId = async () => {
    try {
      const userID = await AsyncStorage.getItem('UserId');
      setUserId(userID);
      if (userID !== null) {
        // Dữ liệu đã tồn tại
        console.log('User id:', userID);
      } else {
        // Không tìm thấy dữ liệu
        console.log('Không tìm thấy dữ liệu.');
      }
    } catch (e) {
      // Xử lý lỗi nếu có
      console.log('Lỗi khi lấy dữ liệu:', e);
    }
  };

  useEffect(() => {
    // deleteCatchData();
    getUserId();
    fetchTopSold();
    fetchTopRating();
    fetchTopNewCourses();
  }, []);

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
      {/* tabheader */}
      <View className="justify-center bg-white h-14 w-full">
        <View className="mr-3 ml-3 p-0 items-end justify-end">
          {userId ? (
            <Ionic
              name="cart-outline"
              size={36}
              onPress={() => {
                navigation.navigate('Cart');
              }}
            />
          ) : (
            <TouchableOpacity  onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text className='font-bold'>Đăng nhập</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
          className="w-full  m-0 p-0 border-0 flex flex-row bg-slate-300 "
          style={{height: 0.25 * height}}>
          {isLoading && (
            <View
              style={{
                position: 'absolute',
                right: 10,
                top: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 20,
                zIndex: 1,
              }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
          <FlatList
            data={topSoldCourses}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.course_id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            contentContainerStyle={{
              justifyContent: 'center',
              position: 'relative',
              paddingBottom: 0,
              zIndex: 1,
            }}
            snapToInterval={ITEM_WIDTH}
            snapToAlignment="start"
            decelerationRate={0.6}
            scrollEventThrottle={64}
            // onEndReached={handelOnEnd}

            renderItem={({item, index}) => {
              return (
                <View
                  className="w-[40%] h-[100%] border-0 border-solid border-gray-300  bg-white  rounded "
                  style={{
                    width: ITEM_WIDTH,
                    position: 'relative',
                    paddingHorizontal: 20,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate('CourseDetails', {
                        courseId: item.course_id,
                      })
                    }
                    style={{
                      backgroundColor: 'transparent',
                    }}>
                    <Image
                      className="w-full h-[40%]"
                      source={{uri: item.image}}
                      resizeMode="cover" // Đảm bảo hình ảnh bao phủ toàn bộ không gian được cung cấp mà không bị méo hoặc căng
                      blurRadius={1} // Tạo hiệu ứng làm mờ nhẹ để giảm thời gian chờ đợi cho người dùng
                      priority="low"
                    />
                    <Text
                      className="text-base font-bold  text-black"
                      style={{alignSelf: 'flex-start'}}>
                      {item.title}
                    </Text>
                    <Text style={{alignSelf: 'flex-start'}}>
                      {' '}
                      {item.user_name}{' '}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                      }}>
                      <Rating
                        ratingCount={5}
                        imageSize={15}
                        startingValue={4}
                      />
                      <Text> (10)</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'flex-start',
                      }}>
                      <Text className="text-base font-bold">{item.price}đ</Text>
                      <Text className="text-sm line-through">
                        {item.promotional_price}đ
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <Text className="text-xl font-bold ml-5">Top đánh giá cao</Text>
        <View
          className="w-full  m-0 p-0 border-0 flex flex-row bg-slate-300 "
          style={{height: 0.25 * height}}>
          {isLoading && (
            <View
              style={{
                position: 'absolute',
                right: 10,
                top: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 20,
                zIndex: 1,
              }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
          <FlatList
            data={topRatingCourses}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.course_id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            contentContainerStyle={{
              justifyContent: 'center',
              position: 'relative',
              paddingBottom: 0,
              zIndex: 1,
            }}
            snapToInterval={ITEM_WIDTH}
            snapToAlignment="start"
            decelerationRate={0.6}
            scrollEventThrottle={64}
            // onEndReached={handelOnEnd}

            renderItem={({item, index}) => {
              return (
                <View
                  className="w-[40%] h-[100%] border-0 border-solid border-gray-300  bg-white  rounded "
                  style={{
                    width: ITEM_WIDTH,
                    position: 'relative',
                    paddingHorizontal: 20,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate('CourseDetails', {
                        courseId: item.course_id,
                      })
                    }
                    style={{
                      backgroundColor: 'transparent',
                    }}>
                    <Image
                      className="w-full h-[40%]"
                      source={{uri: item.image}}
                    />
                    <Text
                      className="text-base font-bold  text-black"
                      style={{alignSelf: 'flex-start'}}>
                      {item.title}
                    </Text>
                    <Text style={{alignSelf: 'flex-start'}}>
                      {' '}
                      {item.user_name}{' '}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                      }}>
                      <Rating
                        ratingCount={5}
                        imageSize={15}
                        startingValue={4}
                      />
                      <Text> (10)</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'flex-start',
                      }}>
                      <Text className="text-base font-bold">{item.price}đ</Text>
                      <Text className="text-sm line-through">
                        {item.promotional_price}đ
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <Text className="text-xl font-bold ml-5">Khóa học mới</Text>
        <View
          className="w-full  m-0 p-0 border-0 flex flex-row bg-slate-300 "
          style={{height: 0.25 * height}}>
          {isLoading && (
            <View
              style={{
                position: 'absolute',
                right: 10,
                top: '60%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 20,
                zIndex: 1,
              }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
          <FlatList
            data={topNewCourses}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.course_id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            contentContainerStyle={{
              justifyContent: 'center',
              position: 'relative',
              paddingBottom: 0,
              zIndex: 1,
            }}
            snapToInterval={ITEM_WIDTH}
            snapToAlignment="start"
            decelerationRate={0.6}
            scrollEventThrottle={64}
            // onEndReached={handelOnEnd}

            renderItem={({item, index}) => {
              return (
                <View
                  className="w-[40%] h-[100%] border-0 border-solid border-gray-300  bg-white  rounded "
                  style={{
                    width: ITEM_WIDTH,
                    position: 'relative',
                    paddingHorizontal: 20,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate('CourseDetails', {
                        courseId: item.course_id,
                      })
                    }
                    style={{
                      backgroundColor: 'transparent',
                    }}>
                    <Image
                      className="w-full h-[40%]"
                      source={{uri: item.image}}
                    />
                    <Text
                      className="text-base font-bold  text-black"
                      style={{alignSelf: 'flex-start'}}>
                      {item.title}
                    </Text>
                    <Text style={{alignSelf: 'flex-start'}}>
                      {' '}
                      {item.user_name}{' '}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                      }}>
                      <Rating
                        ratingCount={5}
                        imageSize={15}
                        startingValue={4}
                      />
                      <Text> (10)</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'flex-start',
                      }}>
                      <Text className="text-base font-bold">{item.price}đ</Text>
                      <Text className="text-sm line-through">
                        {item.promotional_price}đ
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

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

export default HomePage;
