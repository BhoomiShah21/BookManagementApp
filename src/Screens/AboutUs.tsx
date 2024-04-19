import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../Helper/Images';

const AboutUs = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.LOGO} resizeMode="contain" style={styles.logo} />
      <Text style={styles.loginText}>About Us</Text>
      <Text style={styles.text}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
      <TouchableOpacity
        style={styles.cancelContainer}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.cancelText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AboutUs;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingVertical: 20},
  text: {
    fontSize: 13,
    color: 'black',
    paddingHorizontal: 30,
    textAlign: 'justify',
    marginTop: 30,
  },
  logo: {height: 150, width: 150, alignSelf: 'center'},
  loginText: {fontSize: 25, color: 'black', alignSelf: 'center'},
  cancelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#234aa0',
    marginTop: 40,
    height: 45,
    marginHorizontal: 70,
    borderRadius: 10,
    borderWidth: 1,
  },
  cancelText: {fontSize: 15, color: '#234aa0'},
});
