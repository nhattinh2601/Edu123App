import {useState, useEffect, useRef} from 'react';
import {
  View,
  Animated,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Ionic from 'react-native-vector-icons/Ionicons';
import axiosClient from '../../api/axiosClient';



const {width, height} = Dimensions.get('window');

const CategoryDetails = ({route, navigation}) => {
  const {categoryId} = route.params;

  // getData from API
  const [isLoading, setIsLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [courses, setCourses] = useState([]);

  
  const getCategoryName = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get('/categories/' + categoryId);
      setCategoryName(response.data.name);
      console.log(
        'loading category name finish,' +
          ' id:' +
          categoryId +
          ' name:' +
          response.data.name,
      );
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching category name:', error);
    }
  };

  //Flatlist
  
  const WIDTH = Dimensions.get('screen').width;
  const ITEM_WIDTH = WIDTH * 0.45;
  const scrollX = useRef(new Animated.Value(0)).current;

  const getCoursesByCategory = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(
        '/courses/searchCategory/' + categoryId,
      );
      setCourses(response.data);
      console.log(
        'loading course by category finish,' +
          ' id:' +
          categoryId +
          ' data:' +
          response.data,
      );
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  useEffect(() => {
    getCategoryName();
    getCoursesByCategory();
    console.log(courses);
  }, []);

  return (
    <View>
      {/* tabheader */}
      <View className="flex-row items-center bg-white h-14 ">
        <View className="mr-1 ml-3">
          <Ionic
            name="arrow-back-outline"
            size={36}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View className="flex-1 flex-row justify-center items-center ">
          {isLoading && (
            <View className="absolute ">
              <ActivityIndicator size="large" color="gray" />
            </View>
          )}
          <Text className=" text-lg font-bold text-black items-center">
            {categoryName}
          </Text>
        </View>
        <View className="mr-1 ml-3">
          <Ionic
            name="filter-outline"
            size={36}
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </View>

        <View className="mr-3 ml-1">
          <Ionic
            name="cart-outline"
            size={36}
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </View>
      </View>
      {/* content */}
      <View>
        <Text>CategoryDetails {categoryId}</Text>
      </View>
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
          data={courses}
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
                    <Rating ratingCount={5} imageSize={15} startingValue={4} />
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

export default CategoryDetails;
