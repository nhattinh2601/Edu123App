import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Cart() {
  const navigation = useNavigation();
  return (
    <View className='justify-center items-center w-[100%] h-[100%]'>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-md"
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text className="text-white text-lg font-bold">Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
