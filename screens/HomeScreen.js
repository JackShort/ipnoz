import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import Shaker from '../components/shaker.js';
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
    Name: 'RussFest',
    Goal: '6.9 trillion',
  },
  {
    Name: 'North Carolina Real Estate',
    Goal: '1.6 million',
  },
  {
    Name: 'Blackrock Aggressive Fund',
    Goal: '$2',
  },
  {
    Name: 'Chickpea Investment Fund',
    Goal: '$3',
  },

   {
    Name: 'WeWork',
    Goal: 'Literally all of your money',
  },
  
  {
    Name: 'Investment 6',
    Goal: '$3',
  }
];

function Item({ Name, Goal, navigate}) {
  
  return (
    <View style={styles.item}>
       <TouchableOpacity  style={styles.investGroup} onPress={() => navigate.navigate('Investment')} > 
        <View>
          <Text style={styles.investmentName}>{Name}</Text>
          <Text style={styles.investmentName}>Goal: {Goal}</Text>
        </View>
      </TouchableOpacity> 
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
          renderItem={({ item }) => <Item Name={item.Name} Goal={item.Goal} navigate = {this.props.navigation} />}
          keyExtractor={item => item.Name}
          />
          <Shaker />
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
      fontFamily: 'Helvetica',
      fontSize: 16,
    },
    investGroup: {
     
          },
  
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: '#8c90c3',
    },
});
