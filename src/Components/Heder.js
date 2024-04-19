import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = props => {
  return (
    <View style={styles.header}>
      <View style={{flex: 2}} />
      <View style={{flex: 6, alignItems: 'center'}}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={{flex: 2}} />
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {fontSize: 18, color: '#234aa0', fontWeight: '800'},
});
