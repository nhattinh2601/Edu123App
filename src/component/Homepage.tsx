import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Animated,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import courseImage from '../image/cv-1_m.png';
import axiosClient from '../api/axiosClient';

const {width, height} = Dimensions.get('window');
const carouseItem = require('../image/carousel.json');

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

const data = [
  {
    id: '1',
    name: 'Thập diện mai phục',
    images: 'https://i.imgur.com/n99keF9.jpg',
    year: '2004',
  },
  {
    id: '2',
    name: 'Avatar 2',
    images:
      'https://upload.wikimedia.org/wikipedia/vi/e/e0/Avatar_D%C3%B2ng_ch%E1%BA%A3y_c%E1%BB%A7a_n%C6%B0%E1%BB%9Bc_-_Poster_ch%C3%ADnh_th%E1%BB%A9c.jpg',
    year: '2022',
  },
  {
    id: '3',
    name: 'Cuộc đời của Pi',
    images:
      'https://m.media-amazon.com/images/M/MV5BNTg2OTY2ODg5OF5BMl5BanBnXkFtZTcwODM5MTYxOA@@._V1_.jpg',
    year: '2012',
  },
  {
    id: '4',
    name: 'Indiana Jones và chiếc rương thánh tích',
    images:
      'https://toplist.vn/images/800px/indiana-jones-va-chiec-ruong-thanh-tich-1031552.jpg',
    year: '1981',
  },
];

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

  //Flatlist
  const [moviesData, setMoviesData] = useState([]);
  const [topNewCourses, setTopNewCourses] = useState([]);
  const [topSoldCourses, settopSoldCourses] = useState([]);
  const [topRatingCourses, settopRatingCourses] = useState([]);

  const WIDTH = Dimensions.get('screen').width;
  const ITEM_WIDTH = WIDTH * 0.45;
  const MOVIE_SPACER_WIDTH = WIDTH / 10;
  const scrollX = useRef(new Animated.Value(0)).current;

  const [isLoading, setIsLoading] = useState(false);

  const getMoviesDataFromDB = async () => {
    setIsLoading(true);
    const response = await axiosClient.get('/courses/get4CourseSoldRelateInfo');
    setMoviesData(response.data.result);
    console.log(moviesData);
    setIsLoading(false);
  };
  const fetchTopSold = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(
        '/courses/get4CourseSoldRelateInfo',
      );
      settopSoldCourses(response.data);
      console.log("loading top sold course finish");
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching top sold courses:', error);
    }
  };

  const fetchTopRating = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(
        '/courses/get4CourseRatingRelateInfo',
      );
      settopRatingCourses(response.data);
      console.log("loading top rating course finish");
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching top rating courses:', error);
    }
  };

  const fetchTopNewCourses = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(
        "/courses/get4CourseNewRelateInfo"
      );
      setTopNewCourses(response.data);
      console.log("loading top new course finish");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching top new courses:", error);
    }
  };

  useEffect(() => {        
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
                      navigation.navigate('MovieDetails', {
                        movieId: item.course_id,
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
                      navigation.navigate('MovieDetails', {
                        movieId: item.course_id,
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
                      navigation.navigate('MovieDetails', {
                        movieId: item.course_id,
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
