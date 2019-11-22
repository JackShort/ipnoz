import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableHighlight,
  Button,
} from 'react-native';

import { MonoText } from '../components/StyledText';

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

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Investment Portfolio',
  };

  render() {
    return (
      <View style={styles.container}>
          <FlatList
          data={DATA}
          renderItem={({ item }) => <Item Name={item.Name} Price={item.Price} Description={item.Description}/>}
          keyExtractor={item => item.Name}
        />

        <Button title="Sign out" onPress={this._signOutAsync} />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
