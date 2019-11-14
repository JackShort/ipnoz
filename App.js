import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, FlatList, TouchableHighlight} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import moment from "moment";

//Keep the data at the highest level and then 
//have it flow to lower sub components. 

const DATA = [
  {
    Name: 'Investment 1',
    Price: '$1',
    Description: "Test Description"
  },
  {
    Name: 'Investment 2',
    Price: '$2',
    Description: "Test Description"
  },
  {
    Name: 'Investment 3',
    Price: '$3',
    Description: "Test Description"
  },

   {
    Name: 'Investment 4',
    Price: '$1',
    Description: "Test Description"
  },
  {
    Name: 'Investment 5',
    Price: '$2',
    Description: "Test Description"
  },
  {
    Name: 'Investment 6',
    Price: '$3',
    Description: "Test Description"
  },

   {
    Name: 'Investment 7',
    Price: '$1',
    Description: "Test Description"
  },
  {
    Name: 'Investment 8',
    Price: '$2',
    Description: "Test Description"
  },
  {
    Name: 'Investment 9',
    Price: '$3',
    Description: "Test Description"
  },

   {
    Name: 'Investment 10',
    Price: '$1',
    Description: "Test Description"
  },
  {
    Name: 'Investment 11',
    Price: '$2',
    Description: "Test Description"
  },
  {
    Name: 'Investment 12',
    Price: '$3',
    Description: "Test Description"
  },
];

function Item({ Name, Price, Description }) {
  return (
    <View style={styles.item}>
      <TouchableHighlight onPress={(Description) => alert("Description")}> 
        <Text style={styles.investmentName}>{Name}, {Price} </Text>
      </TouchableHighlight>
    </View>
  );
}

//converted to functional component 
export default function App() {

    return (
      <View style={styles.container}>
      <View style={{height: 40, width: "100%"}}/>
      <LinearGradient
          colors={['#FFFFFF', '#D3DAEB', '#FFFFFF']}>
      <Text style={styles.header}> 
        Ipnoz Portfolio
      </Text>
        <FlatList
        data={DATA}
        renderItem={({ item }) => <Item Name={item.Name} Price={item.Price} Description={item.Description}/>}
        keyExtractor={item => item.Name}
      />
      </LinearGradient>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  header: {
  //  flex:1, 
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30
  },

  investmentName: {
    fontSize: 32,
  },

  item: {
    backgroundColor: '#837CDC',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
