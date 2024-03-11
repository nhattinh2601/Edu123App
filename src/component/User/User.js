
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function User (){
  const navigation = useNavigation();

        return (
                <View className='justify-center items-center w-[100%] h-[100%]'>
                <TouchableOpacity
                  className="bg-blue-500 p-4 rounded-md"
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text className="text-white text-base font-bold">Đăng nhập</Text>
                </TouchableOpacity>
              </View>
        )
}