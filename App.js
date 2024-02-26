import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Introduce from './src/component/Introduce';
import Register from './src/component/Register';
import Login from './src/component/Login';
import HomePage from './src/component/Homepage';
import ForgetPassword from './src/component/ForgetPassword';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Introduce">
        <Stack.Screen name="Introduce" component={Introduce} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
