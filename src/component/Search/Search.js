import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {  
  faLanguage,
  faBullhorn,
  faDesktop,
  faPencilRuler,
  faUserGraduate,    
  faLaptopCode,  
} from '@fortawesome/free-solid-svg-icons';


const Search = ({navigation}) => {
  return (
    <View>
      {/* tabheader */}
      <View className="flex-row items-center bg-white h-14 ">
        <View className="flex-1 flex-row justify-center items-center bg-gray-400 rounded-lg">
          <Ionic name="search-outline" size={36} />
          <TextInput
            placeholder="Tìm khóa học"
            onSubmitEditing={event => {
              const searchText = event.nativeEvent.text;
              console.log(searchText);
            }}
            returnKeyType="search"
            className=" flex-1 text-lg font-bold text-black"
          />
        </View>

        <View className="mr-3 ml-3">
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
      <Text className="text-base font-bold ml-2 mr-2 text-black">
        Danh mục khóa học
      </Text>
      
      <TouchableOpacity className='ml-2 mr-2 ' 
      onPress={() =>
        navigation.navigate('CategoryDetails', {
          categoryId: 11,
        })
      }
      >
        <View className='flex-row items-center p-1'>
      <FontAwesomeIcon
                icon={faLanguage}
                size={30}
                style={{ opacity: 0.8, padding: "5px" }}
              />
      <Text className='text-base ml-5'>Ngoại ngữ</Text>      
      </View>
      <View className="border-b border-black w-full mt-0 mb-0" />
      </TouchableOpacity>

      <TouchableOpacity className='ml-2 mr-2 ' 
      onPress={() =>
        navigation.navigate('CategoryDetails', {
          categoryId: 14,
        })
      }>
        <View className='flex-row items-center p-1'>
      <FontAwesomeIcon
                icon={faBullhorn}
                size={30}
                style={{ opacity: 0.8, padding: "5px" }}                
              />
      <Text className='text-base ml-5'>Marketing</Text>      
      </View>
      <View className="border-b border-black w-full mt-0 mb-0" />
      </TouchableOpacity>

      <TouchableOpacity className='ml-2 mr-2 p-1' 
      onPress={() =>
        navigation.navigate('CategoryDetails', {
          categoryId: 24,
        })
      }
      >
        <View className='flex-row items-center'>
      <FontAwesomeIcon
                icon={faDesktop}
                size={30}
                style={{ opacity: 0.8, padding: "5px" }}                
              />
      <Text className='text-base ml-5'>Tin học văn phòng</Text>      
      </View>
      <View className="border-b border-black w-full mt-0 mb-0" />
      </TouchableOpacity>      

      <TouchableOpacity className='ml-2 mr-2 p-1' onPress={() =>
        navigation.navigate('CategoryDetails', {
          categoryId: 25,
        })
      }>
        <View className='flex-row items-center'>
      <FontAwesomeIcon
                icon={faPencilRuler}
                size={30}
                style={{ opacity: 0.8, padding: "5px" }}                
              />
      <Text className='text-base ml-5'>Thiết kế</Text>      
      </View>
      <View className="border-b border-black w-full mt-0 mb-0" />
      </TouchableOpacity> 

      <TouchableOpacity className='ml-2 mr-2 p-1' onPress={() =>
        navigation.navigate('CategoryDetails', {
          categoryId: 26,
        })
      }>
        <View className='flex-row items-center'>
      <FontAwesomeIcon
                icon={faUserGraduate}
                size={30}
                style={{ opacity: 0.8, padding: "5px" }}                
              />
      <Text className='text-base ml-5'>Phát triển bản thân</Text>      
      </View>
      <View className="border-b border-black w-full mt-0 mb-0" />
      </TouchableOpacity> 

      <TouchableOpacity className='ml-2 mr-2 p-1' onPress={() =>
        navigation.navigate('CategoryDetails', {
          categoryId: 12,
        })
      }>
        <View className='flex-row items-center'>
      <FontAwesomeIcon
                icon={faLaptopCode}
                size={30}
                style={{ opacity: 0.8, padding: "5px" }}                
              />
      <Text className='text-base ml-5'>Công nghệ thông tin</Text>      
      </View>
      <View className="border-b border-black w-full mt-0 mb-0" />
      </TouchableOpacity>      
    </View>
  );
};

export default Search;
