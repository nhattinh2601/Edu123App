import {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import axiosClient from '../../api/axiosClient';

const CategoryDetails = ({route, navigation}) => {
  const {categoryId} = route.params;

  // getData from API
  const [isLoading, setIsLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');

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

  useEffect(() => {
    getCategoryName();
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
    </View>
  );
};

export default CategoryDetails;
