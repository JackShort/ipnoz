import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableHighlight,
  Button,
} from 'react-native';
import { ListItem } from 'react-native-material-ui';
import InvestButton from '../components/InvestButton';


import { MonoText } from '../components/StyledText';

const DATA = [
  {
    Name: 'RussFest',
    Goal: '6.9 trillion',
    ROI: '20/4'
  },
  {
    Name: 'WeWork',
    Goal: 'Literally all of your money',
    ROI: '50/10'
  },
  {
    Name: 'North Carolina Real Estate',
    Goal: '1.6 million',
    ROI: '10/4'
  },
  {
    Name: 'Blackrock Aggressive Fund',
    Goal: '2 Russbucks',
    ROI: '100/4'
  },
  {
    Name: 'Chickpea Investment Fund',
    Goal: '3.4 Russbucks',
    ROI: '500/2'
  },
];

function Item({ Name, Goal, ROI, navigate}) {
  const a = {Name}['Name']
  const b = {Goal}['Goal']
  const c = {ROI}['ROI']

  return (
    <View >
        <StatusBar backgroundColor="blue" barStyle="light-content" />
      <ListItem
        style={{ container: {backgroundColor: "#222f3e"}, rightElement: { color: '#0abde3' }, secondaryText: { color: "#8395a7" }, primaryText: { color: "#c8d6e5", fontWeight: 'bold', fontSize: 17 }, tertiaryText: { color: "#1dd1a1" } }}
        centerElement={{
          primaryText: a,
          secondaryText : "Goal: " + b,
          tertiaryText : 'Weekly Increase: +5%',
        }}
        rightElement='attach-money'
        leftElement={<InvestButton ROI={c}/>}
        onPress={() => {navigate.navigate(a)}}
      />
      
    </View>
  );
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Available Funds',
    headerTintColor: "#c8d6e5",
    headerStyle: {
      backgroundColor: '#222f3e',
      borderBottomColor: '#222f3e',
    },
  };

  render() {

    return (
      <View style={styles.container}>
          <FlatList
          data={DATA}
          renderItem={({ item }) => <Item Name={item.Name} Goal={item.Goal} ROI={item.ROI} navigate = {this.props.navigation} />}
          keyExtractor={item => item.Name}
        />
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
    backgroundColor: '#222f3e',
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
