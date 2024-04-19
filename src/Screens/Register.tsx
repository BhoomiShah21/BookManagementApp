import React, {useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {IMAGES} from '../Helper/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({navigation}: any) => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email format');
      return;
    }

    // Validate password strength (at least 6 characters)
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters long');
      return;
    }

    // Save user data to AsyncStorage
    const userData = {username, email, password};
    await AsyncStorage.setItem('userData', JSON.stringify(userData));

    // Navigate to login screen
    navigation.navigate('Login');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={[styles.container, {paddingVertical: 100}]}>
            <Image
              source={IMAGES.LOGO}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.loginText}>Sign up</Text>
            <TextInput
              value={username}
              onChangeText={(val: any) => setUserName(val)}
              style={styles.userNameInput}
              placeholder="Enter Full Name"
              placeholderTextColor={'grey'}
            />
            <TextInput
              value={email}
              onChangeText={(val: any) => setEmail(val)}
              style={styles.passInput}
              placeholder="Enter Email"
              placeholderTextColor={'grey'}
            />
            <TextInput
              value={password}
              onChangeText={(val: any) => setPassword(val)}
              style={styles.passInput}
              placeholder="Enter New Password"
              placeholderTextColor={'grey'}
            />
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={() => handleRegister()}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <Text style={styles.registerDes}>
              Have an account?{' '}
              <Text
                style={styles.signupText}
                onPress={() => navigation.navigate('Login')}>
                Sign in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Register;

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
  error: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
    marginHorizontal: 30,
  },
  passInput: {
    borderRadius: 10,
    height: 45,
    borderWidth: 1,
    marginHorizontal: 30,
    marginTop: 20,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 12,
  },
  submitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#234aa0',
    marginTop: 40,
    height: 45,
    marginHorizontal: 70,
    borderRadius: 10,
  },
  submitText: {fontSize: 15, color: 'white'},
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
});
