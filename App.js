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
import UpdateInfo from './src/component/Account/UpdateInfo';
import CourseStudy from './src/component/Course/CourseStudy';
import React from 'react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
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
      <Tab.Screen name="Study" component={Study} options={{
          title: 'Các khóa học của tôi', // Tiêu đề của tab
          headerTitleAlign: 'center',
        }} />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          title: 'Tài khoản', // Tiêu đề của tab
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
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
            headerShown: false,
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
        <Stack.Screen
          name="CourseStudy"
          component={CourseStudy}
          options={({navigation}) => ({
            headerShown: false,
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
        <Stack.Screen
          name="Login"
          component={Login}
          options={({navigation}) => ({
            headerTitle: 'Đăng nhập',
            headerTitleAlign: 'center',
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
          name="Register"
          component={Register}
          options={({navigation}) => ({
            headerTitle: 'Đăng ký',
            headerTitleAlign: 'center',
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
          name="ForgetPassword"
          component={ForgetPassword}
          options={({navigation}) => ({
            headerTitle: 'Quên mật khẩu',
            headerTitleAlign: 'center',
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
          name="ChangePassword"
          component={ChangePassword}
          options={({navigation}) => ({
            headerTitle: 'Đổi mật khẩu',
            headerTitleAlign: 'center',
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
          name="UpdateInfo"
          component={UpdateInfo}
          options={({navigation}) => ({
            headerTitle: 'Cập nhật thông tin',
            headerTitleAlign: 'center',
            headerShown: true,
            headerLeft: () => (
              <Ionic
                name="arrow-back"
                size={24}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'User' }],
                  });
                  navigation.goBack();
                }}
                style={{marginLeft: 15}}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
