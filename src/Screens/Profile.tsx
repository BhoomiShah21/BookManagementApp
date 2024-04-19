import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../Components/Heder';
import {IMAGES} from '../Helper/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}: any) => {
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    };
    fetchUserData();
  }, []);
  const Logout = () => {
    AsyncStorage.removeItem('loginData');
    navigation.navigate('Auth');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Header title="Profile" />
      <Image source={IMAGES.PROFILE} style={styles.img} />
      {userData ? (
        <>
          <Text style={styles.name}>Full Name: {userData?.username}</Text>
          <Text style={styles.email}>Email: {userData?.email}</Text>
        </>
      ) : (
        <Text style={styles.name}>No user data found</Text>
      )}
      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.aboutText}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => navigation.navigate('ContactUs')}>
        <Text style={styles.aboutText}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={() => Logout()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  img: {height: 150, width: 150, alignSelf: 'center', marginTop: 40},
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    color: '#234aa0',
  },
  email: {
    alignSelf: 'center',
    marginTop: 3,
    fontSize: 12,
    color: 'grey',
  },
  logoutButton: {
    backgroundColor: '#234aa0',
    marginHorizontal: 40,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  aboutButton: {
    borderColor: '#234aa0',
    marginHorizontal: 40,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    borderRadius: 10,
    borderWidth: 1,
  },
  contactButton: {
    borderColor: '#234aa0',
    marginHorizontal: 40,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  logoutText: {fontSize: 15, color: 'white'},
  aboutText: {fontSize: 15, color: '#234aa0'},
});
