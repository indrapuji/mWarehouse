import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/HomeScreen';
import Login from './src/screens/LoginScreen';
import Search from './src/screens/SearchScreen';
import SearchUser from './src/screens/SearchUserScreen';
import Register from './src/screens/RegisterScreen';
import Scan from './src/screens/ScanScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: null, headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: null, headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{title: null, headerShown: false}}
        />
        <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{title: null, headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: null, headerShown: false}}
        />
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{title: null, headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
