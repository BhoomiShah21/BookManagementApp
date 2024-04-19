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

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    // Validation logic goes here

    // Retrieve user data from AsyncStorage
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const {email: storedEmail, password: storedPassword} =
        JSON.parse(userData);
      if (email === storedEmail && password.trim('') === storedPassword) {
        // Navigate to profile screen
        navigation.replace('Stack');

        AsyncStorage.setItem('loginData', email);
      } else {
        Alert.alert('Invalid email or password');
      }
    } else {
      Alert.alert('User not found. Please register.');
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
          <View style={[styles.container, {paddingVertical: 100}]}>
            <Image
              source={IMAGES.LOGO}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.loginText}>Login</Text>
            <TextInput
              value={email}
              onChangeText={(val: any) => setEmail(val)}
              style={styles.userNameInput}
              placeholder="Enter Email"
              placeholderTextColor={'grey'}
            />
            <TextInput
              value={password.trim('')}
              onChangeText={(val: any) => setPassword(val)}
              style={styles.passInput}
              placeholder="Enter Password"
              placeholderTextColor={'grey'}
            />
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={() => handleLogin()}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <Text style={styles.registerDes}>
              Don't have an account?{' '}
              <Text
                style={styles.signupText}
                onPress={() => navigation.navigate('Register')}>
                Sign up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Login;

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
