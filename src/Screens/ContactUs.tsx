import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import {IMAGES} from '../Helper/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactUs = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [des, setDes] = useState<string>('');

  const handleContact = async () => {
    if (!name || !email || !des) {
      Alert.alert('Please fill in all fields');
      return;
    } else {
      navigation.navigate('Profile');
      const data = {name, email, des};
      AsyncStorage.setItem('contact', JSON.stringify(data));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={[styles.container, {paddingVertical: 20}]}>
            <Image
              source={IMAGES.LOGO}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.loginText}>Contact Us</Text>
            <TextInput
              value={name}
              onChangeText={(val: any) => setName(val)}
              style={styles.userNameInput}
              placeholder="Enter Full Name"
              placeholderTextColor={'grey'}
            />
            <TextInput
              value={email}
              onChangeText={(val: any) => setEmail(val)}
              style={styles.emailInput}
              placeholder="Enter Email"
              placeholderTextColor={'grey'}
            />
            <TextInput
              value={des}
              onChangeText={(val: any) => setDes(val)}
              style={styles.passInput}
              placeholder="Enter Message"
              placeholderTextColor={'grey'}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitContainer}
                onPress={() => handleContact()}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelContainer}
                onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ContactUs;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  logo: {height: 150, width: 150, alignSelf: 'center'},
  loginText: {fontSize: 25, color: 'black', alignSelf: 'center'},
  userNameInput: {
    borderRadius: 10,
    height: 45,
    borderWidth: 1,
    marginHorizontal: 30,
    marginTop: 80,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 12,
  },
  emailInput: {
    borderRadius: 10,
    height: 45,
    borderWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 12,
  },
  passInput: {
    borderRadius: 10,
    height: 80,
    borderWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 12,
    textAlignVertical: 'top',
  },
  submitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#234aa0',
    marginTop: 40,
    height: 45,
    width: 140,
    // marginHorizontal: 70,
    borderRadius: 10,
  },
  cancelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#234aa0',
    marginTop: 40,
    height: 45,
    // marginHorizontal: 70,
    borderRadius: 10,
    borderWidth: 1,
    width: 140,
  },
  submitText: {fontSize: 15, color: 'white'},
  cancelText: {fontSize: 15, color: '#234aa0'},
  registerDes: {
    fontSize: 13,
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#234aa0',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
