import {useState, useEffect, useRef} from 'react';
import {
  View,  
  Text,
  TouchableOpacity,
  ActivityIndicator,  
  FlatList,
  Image,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Ionic from 'react-native-vector-icons/Ionicons';
import axiosClient from '../../api/axiosClient';


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
  const getCoursesByCategory = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(
        '/courses/searchCategory/' + categoryId,
      );
      setCourses(response.data);
      console.log(
        'loading ' + response.data.length+ ' course by category finish'
      );
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  useEffect(() => {
    getCategoryName();
    getCoursesByCategory();    
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
      <View className="w-full  m-0 p-0 border-0 flex flex-row bg-gray ">
          {isLoading && (
            <View className="absolute">
              <ActivityIndicator size="large" color="gray" />
            </View>
          )}          
        
        <FlatList
          data={courses}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.Id}
          contentContainerStyle={{
            paddingBottom: 20,
            zIndex: 1,
          }}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 8,
                  marginBottom: 16, // Khoảng cách giữa các item
                }} 
                className='bg-white ml-1 mr-1'
                >
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
                    style={{
                      width: '100%',
                      aspectRatio: 4 / 3, // Tỉ lệ khung hình của ảnh
                      borderRadius: 8, // Bo góc cho ảnh
                      marginBottom: 8, // Khoảng cách giữa ảnh và các thông tin khác
                    }}
                    source={{uri: item.image}}
                  />
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    {item.title}
                  </Text>
                  <Text>{item.user_name}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Rating ratingCount={5} imageSize={15} startingValue={4} />
                    <Text>({item.rating_count})</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>{item.price}đ</Text>
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        marginLeft: 4,
                      }}>
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

export default CategoryDetails;
