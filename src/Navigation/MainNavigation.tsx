// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import StackNavigation from './StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
// import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

function MainNavigation() {
  const [initRoute, setInitRoute] = React.useState<string>('');

  React.useEffect(() => {
    AsyncStorage.getItem('loginData').then(val => {
      if (val !== null) {
        setInitRoute('Stack');
      } else {
        setInitRoute('Auth');
      }
    });
    SplashScreen.hide();
  }, [initRoute]);
  return (
    <NavigationContainer>
      {initRoute.length !== 0 && (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={initRoute}>
          <Stack.Screen name="Auth" component={AuthNavigation} />
          <Stack.Screen name="Stack" component={StackNavigation} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default MainNavigation;
