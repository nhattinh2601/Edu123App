import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Introduce from './src/component/Introduce';
import Register from './src/component/Register';
import Login from './src/component/Login';
import HomePage from './src/component/Homepage';
import ForgetPassword from './src/component/ForgetPassword';
import Home from './src/component/Home/Home';
import User from './src/component/User/User';
import { NativeScreenContainer } from 'react-native-screens';
import Ionic from 'react-native-vector-icons/Ionicons';
import Search from './src/component/Search/Search';
import Study from './src/component/Study/Study';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart, faStar, faHome, faSearch, faBook, faUser } from "@fortawesome/free-solid-svg-icons";



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
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
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Study" component={Study} />
      <Tab.Screen name="User" component={User} />
      
    </Tab.Navigator>
  );
};

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="HomePage" screenOptions={{
//           headerShown: false,
//         }}>
//         {/* <Stack.Screen name="Introduce" component={Introduce} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="Login" component={Login} /> */}
//         <Stack.Screen name="HomePage" component={Login} />
//         {/* <Stack.Screen name="ForgetPassword" component={ForgetPassword} /> */}
//         <Stack.Screen name="BottomTabs" component={BottomTabs} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;


