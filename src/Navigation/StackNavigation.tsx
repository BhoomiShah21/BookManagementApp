// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import AddBook from '../Screens/AddBook';
import AboutUs from '../Screens/AboutUs';
import ContactUs from '../Screens/ContactUs';
// import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

function StackNavigation() {
  // React.useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="AddBook" component={AddBook} />
      <Stack.Screen name="About" component={AboutUs} />
      <Stack.Screen name="ContactUs" component={ContactUs} />

    </Stack.Navigator>
  );
}

export default StackNavigation;
