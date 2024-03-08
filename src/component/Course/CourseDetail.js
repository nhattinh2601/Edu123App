import {View, Text} from 'react-native';

const CourseDetails = ({route, navigation}) => {
  const {courseId} = route.params;
  return (
    <View>
      <Text>CourseDetails {courseId}</Text>
    </View>
  );
};      

export default CourseDetails;
                                                                                           