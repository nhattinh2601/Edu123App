import { TouchableOpacity, Text } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import HomePage from './src/component/Homepage';

import User from './src/component/User/User';

import Ionic from 'react-native-vector-icons/Ionicons';
import Search from './src/component/Search/Search';
import Study from './src/component/Study/Study';

import Cart from './src/component/Cart/Cart';
import CourseDetails from './src/component/Course/CourseDetail';
import CategoryDetails from './src/component/Category/CategoryDetails';
import Login from './src/component/Account/Login';
import Register from './src/component/Account/Register';
import ForgetPassword from './src/component/Account/ForgetPassword';
import ChangePassword from './src/component/Account/ChangePassword';

import React from 'react';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BottomTabs = ()  => {
  
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: {
          // backgroundColor: '#1A1A23',
          backgroundColor: 'gray',
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          position: 'absolute',
          borderTopColor: 'transparent',
          elevation: 0,
          height: 54,
          overflow: 'hidden',
        },
        tabBarIcon: ({focused, colour}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
            colour = focused && '#ffffff';
          } else if (route.name === 'Study') {
            iconName = focused ? 'book' : 'book-outline';
            colour = focused && '#ffffff';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
            colour = focused && '#ffffff';
          } else if (route.name === 'User') {
            iconName = focused ? 'person' : 'person-outline';
            colour = focused && '#ffffff';
          }

          return (
            <>
              <Ionic
                name={iconName}
                style={{marginBottom: 4}}
                size={22}
                color={colour ? colour : '#ffffff40'}
              />
              <Ionic
                name="ellipse"
                style={{display: colour ? 'flex' : 'none'}}
                size={4}
                color={colour ? colour : 'transparent'}
              />
            </>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={({navigation}) => ({
          headerTitle: '',
          headerShown: false,
          headerRight: () => (
            <Ionic
              name="cart-outline"
              size={36}
              onPress={() => {
                // Chuyển hướng đến component Cart khi nhấn vào icon cart
                navigation.navigate('Cart');
              }}
              style={{marginRight: 15}}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen name="Study" component={Study} />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          title: 'Tài khoản', // Tiêu đề của tab
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {  
  // const [userID, setUserID] = useState('');
  // const getData = async () => {
  //   try {      
  //     const userID = await AsyncStorage.getItem('UserId');
  //     setUserID(userID);      
  //     if (userID !== null ) {
  //       // Dữ liệu đã tồn tại
  //       console.log('User id:', userID);
  //     } else {
  //       // Không tìm thấy dữ liệu
  //       console.log('Không tìm thấy dữ liệu.');
  //     }
  //   } catch (e) {
  //     // Xử lý lỗi nếu có
  //     console.log('Lỗi khi lấy dữ liệu:', e);
  //   }
  // }
  useEffect(() => {
    // getData();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={({navigation}) => ({
            headerShown: true,
            headerLeft: () => (
              <Ionic
                name="arrow-back"
                size={24}
                onPress={() => {
                  navigation.goBack();
                }}
                style={{marginLeft: 15}}
              />
            ),
          })}
        />
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetails}
          options={({navigation}) => ({
            headerShown: true,
            headerTitle: 'Chi tiết khóa học',
            headerLeft: () => (
              <Ionic
                name="arrow-back"
                size={24}
                onPress={() => {
                  navigation.goBack();
                }}
                style={{marginLeft: 15}}
              />
            ),
          })}
        />
        <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
