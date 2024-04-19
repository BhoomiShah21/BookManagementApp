import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
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
import {useFocusEffect} from '@react-navigation/native';

const BookiList = ({navigation, route}: any) => {
  const [bookList, setBookList] = useState<any[]>([]);
  useFocusEffect(
    useCallback(() => {
      // Fetch book details from AsyncStorage based on ID
      const fetchBook = async () => {
        try {
          const books = await AsyncStorage.getItem('books');
          if (books) {
            const parsedBooks = JSON.parse(books);
            console.log('book ::', parsedBooks);
            setBookList(parsedBooks);
          }
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };

      fetchBook();
    }, []),
  );
  const renderItem = ({item, index}: {item: any; index: any}) => (
    <View style={styles.box}>
      <View style={[styles.textContainer]}>
        <View style={{flex: 5}}>
          <Text style={styles.keyText}>Book Id:</Text>
        </View>
        <View style={{flex: 7}}>
          <Text style={styles.valText}>{item.id}</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={[styles.textContainer, {marginTop: 5}]}>
        <View style={{flex: 5}}>
          <Text style={styles.keyText}>Book Name:</Text>
        </View>
        <View style={{flex: 7}}>
          <Text style={styles.valText}>{item.bookName}</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={[styles.textContainer, {marginTop: 5}]}>
        <View style={{flex: 5}}>
          <Text style={styles.keyText}>Author:</Text>
        </View>
        <View style={{flex: 7}}>
          <Text style={styles.valText}>{item.bookAuthor}</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={[styles.textContainer, {marginTop: 5}]}>
        <View style={{flex: 5}}>
          <Text style={styles.keyText}>Quantity:</Text>
        </View>
        <View style={{flex: 7}}>
          <Text style={styles.valText}>{item.Quantity}</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={[styles.textContainer, {marginTop: 5}]}>
        <View style={{flex: 5}}>
          <Text style={styles.keyText}>Price:</Text>
        </View>
        <View style={{flex: 7}}>
          <Text style={styles.valText}>{item.bookPrice}</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={[styles.textContainer, {marginTop: 5}]}>
        <View style={{flex: 5}}>
          <Text style={styles.keyText}>Date:</Text>
        </View>
        <View style={{flex: 7}}>
          <Text style={styles.valText}>{item.date}</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonSubContainer}
          onPress={() => navigation.navigate('AddBook', {id: item.id})}>
          <Image source={IMAGES.EDIT} style={styles.editButton} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSubContainer2}
          onPress={() => handleDeleteBook(item.bookName)}>
          <Image source={IMAGES.DELETE} style={styles.deleteButton} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
  const handleDeleteBook = async bookName => {
    try {
      // Filter out the book to be deleted
      const updatedBooks = bookList.filter(book => book.bookName !== bookName);
      // Save updated books to AsyncStorage
      await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
      // Update state
      setBookList(updatedBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Header title="Book List" />
      <FlatList
        data={bookList}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Book List Found!</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBook')}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default BookiList;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  box: {
    marginHorizontal: 25,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#234aa0',
  },
  emptyText: {fontSize: 14, color: 'grey'},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 200,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  keyText: {fontSize: 13, color: 'grey'},
  valText: {fontSize: 13, color: '#234aa0'},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonSubContainer: {
    flex: 5,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  buttonSubContainer2: {
    flex: 7,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  editText: {fontSize: 14, color: '#234aa0', marginLeft: 10},
  deleteText: {fontSize: 14, color: 'red', marginLeft: 10},
  deleteButton: {height: 15, width: 15},
  editButton: {height: 15, width: 15, tintColor: '#234aa0'},
  addButton: {
    position: 'absolute',
    bottom: 20, // Adjust as needed
    right: 20, // Adjust as needed
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 200,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
