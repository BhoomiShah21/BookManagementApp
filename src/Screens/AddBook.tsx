import React, {useEffect, useState} from 'react';
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
import Header from '../Components/Heder';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBook = ({navigation, route}: any) => {
  const [bookName, setBookName] = useState<string>('');
  const [bookAuthor, setBookAuther] = useState<string>('');
  const [Quantity, setQuantity] = useState<string>('');
  const [bookPrice, setBookPrice] = useState<string>('');

  useEffect(() => {
    // Fetch book details from AsyncStorage based on ID
    const fetchBook = async () => {
      if (route?.params?.id !== undefined) {
        try {
          const books = await AsyncStorage.getItem('books');
          if (books) {
            const parsedBooks = JSON.parse(books);
            const book = parsedBooks.find(
              (book: any) => book.id === route?.params?.id,
            );
            if (book) {
              setBookName(book.bookName);
              setBookAuther(book.bookAuthor);
              setQuantity(book.Quantity);
              setBookPrice(book.bookPrice);
            }
          }
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      }
    };

    fetchBook();
  }, [route?.params?.id]);
  const generateRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  };
  const handleAddBook = async () => {
    if (validateInputs()) {
      let date = new Date();
      if (bookName && bookAuthor && Quantity && bookPrice) {
        let newBook;
        if (route?.params?.id !== undefined) {
          // Editing existing book
          newBook = {
            id: route?.params?.id,
            bookName,
            bookAuthor,
            Quantity,
            bookPrice,
            date,
          };
        } else {
          // Adding new book
          newBook = {
            id: generateRandomId(), // Generate unique ID for new book
            bookName,
            bookAuthor,
            Quantity,
            bookPrice,
            date,
          };
        }
        try {
          // Get existing books from AsyncStorage
          const existingBooks = await AsyncStorage.getItem('books');
          let books = [];
          if (existingBooks) {
            books = JSON.parse(existingBooks);
            if (route?.params?.id !== undefined) {
              // If editing, find the index of the book being edited
              const index = books.findIndex(book => book.id === newBook.id);
              // Replace the existing book with the edited book
              if (index !== -1) {
                books[index] = newBook;
              }
            } else {
              // If adding new book, push it to the existing books array
              books.push(newBook);
            }
          } else {
            // If no existing books, add the new book as the only book
            books.push(newBook);
          }
          // Save updated books to AsyncStorage
          await AsyncStorage.setItem('books', JSON.stringify(books));
          // Navigate back to the list screen
          navigation.goBack();
        } catch (error) {
          console.error('Error adding book:', error);
        }
      }
    }
  };

  const validateInputs = () => {
    if (
      !bookName.trim() ||
      !bookAuthor.trim() ||
      !Quantity.trim() ||
      !bookPrice.trim()
    ) {
      Alert.alert('Please fill in all fields');
      return false;
    }

    // Validate quantity (must be a positive integer)
    const quantityRegex = /^[1-9]\d*$/;
    if (!quantityRegex.test(Quantity)) {
      Alert.alert('Quantity must be a positive integer');
      return false;
    }

    // Validate price (must be a positive number)
    const priceRegex = /^\d*\.?\d*$/;
    if (!priceRegex.test(bookPrice)) {
      Alert.alert('Invalid price format');
      return false;
    }

    // Clear error if all validations pass
    return true;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <Header text="Add Book" />
          <View style={[styles.container]}>
            <Image
              source={IMAGES.LOGO}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.loginText}>Add Book Details</Text>
            <TextInput
              value={bookName}
              onChangeText={(val: any) => setBookName(val)}
              style={styles.userNameInput}
              placeholder="Enter Book Name"
              placeholderTextColor={'grey'}
            />
            <TextInput
              value={bookAuthor}
              onChangeText={(val: any) => setBookAuther(val)}
              style={styles.passInput}
              placeholder="Enter Book Author"
              placeholderTextColor={'grey'}
            />
            <TextInput
              value={Quantity}
              onChangeText={(val: any) => setQuantity(val)}
              style={styles.passInput}
              placeholder="Enter Quantity"
              placeholderTextColor={'grey'}
              keyboardType="number-pad"
            />
            <TextInput
              value={bookPrice}
              onChangeText={(val: any) => setBookPrice(val)}
              style={styles.passInput}
              placeholder="Enter Book Price"
              placeholderTextColor={'grey'}
              keyboardType="number-pad"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitContainer}
                onPress={() => handleAddBook()}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelContainer}
                onPress={() => navigation.navigate('TabNavigation')}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default AddBook;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  logo: {height: 150, width: 150, alignSelf: 'center'},
  loginText: {fontSize: 25, color: 'black', alignSelf: 'center'},
  userNameInput: {
    borderRadius: 10,
    height: 45,
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 60,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 12,
  },
  passInput: {
    borderRadius: 10,
    height: 45,
    borderWidth: 1,
    marginHorizontal: 20,
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
    // marginHorizontal: 30,
    borderRadius: 10,
    width: 145,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cancelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#234aa0',
    marginTop: 40,
    height: 45,
    width: 145,
    // marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  cancelText: {fontSize: 15, color: '#234aa0'},

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
