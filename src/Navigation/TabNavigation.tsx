import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BookiList from '../Screens/BookList';
import Profile from '../Screens/Profile';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMAGES} from '../Helper/Images';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="BookList"
        component={BookiList}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={[styles.text, {color: focused ? '#234aa0' : 'black'}]}>
                Book List
              </Text>
            );
          },
          tabBarIcon: ({focused}) => {
            const image = focused ? IMAGES.BOOK_FILL : IMAGES.BOOK;
            return (
              <Image
                source={image}
                style={[styles.img, {tintColor: focused ? '#234aa0' : 'black'}]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => {
            return (
              <Text
                style={[styles.text, {color: focused ? '#234aa0' : 'black'}]}>
                Profile
              </Text>
            );
          },
          tabBarIcon: ({focused}) => {
            const image = focused ? IMAGES.USER_FILL : IMAGES.USER;
            return (
              <Image
                source={image}
                style={[styles.img, {tintColor: focused ? '#234aa0' : 'black'}]}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default TabNavigation;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
  img: {
    height: 25,
    width: 25,
  },
});
