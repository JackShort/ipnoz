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

import { firebase } from '@firebase/app';
import '@firebase/firestore';
import { parse } from 'qs';
const firebaseConfig = {
  apiKey: "AIzaSyDeC0z-nYBAquUosqYmQ31m0m4KeWRd7rk",
  authDomain: "ipnoz-6d6b3.firebaseapp.com",
  databaseURL: "ipnoz-6d6b3.firebaseio.com",
  projectId: "ipnoz-6d6b3",
  storageBucket: "ipnoz-6d6b3.appspot.com",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

import t from "tcomb-form-native";

const Form = t.form.Form;

var Positive = t.refinement(t.Number, function(n) {
    return n >= 0;
});

const Money = t.struct({
    value: Positive
});

const options = {
    fields: {
        value: {
            error: "Please enter an amount"
        }
    }
};

import { MonoText } from '../components/StyledText';

const DATA = [
  {
    Name: "Joe's Shitty Scheme",
    Goal: '6.9 trillion',
    Margin: 18746
  },
  {
    Name: `Jack's "literally cannot lose money" trashcan of money`,
    Goal: 'Literally all of your money',
    Margin: -178666
  },
  {
    Name: "Han's Roulette Investment Fund",
    Goal: '1.6 million',
    Margin: -1
  },
  {
    Name: "Chirag's Investment Loophole",
    Goal: '$2',
    Margin: .5
  },
  {
    Name: "Shooting dice in my neighbor's alley would be a better investment",
    Goal: '$3',
    Margin: -721
  },
];

function currencyFormat(num) {
        num = String(num);
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

function Item({ Name, Goal, Margin, navigate}) {
  const a = {Name}['Name']
  const b = {Goal}['Goal']
  const c = {Margin}['Margin']

  return (
    <View >
        <StatusBar backgroundColor="blue" barStyle="light-content" />
      <ListItem
        style={{ container: {backgroundColor: "#222f3e"}, rightElement: { color: c >= 0 ? "#1dd1a1" : "#ee5253" }, secondaryText: { color: "#8395a7" }, primaryText: { color: "#c8d6e5", fontWeight: 'bold', fontSize: 17 }, tertiaryText: { color: c >= 0 ? "#1dd1a1" : "#ee5253"} }}
        centerElement={{
          primaryText: a,
          secondaryText : "Goal: " + currencyFormat(b * 100000000) + " Russbucks",
          tertiaryText : c >= 0 ? "+" + currencyFormat(c * 100000000) + " Russbucks" : "-" + currencyFormat(-1 * c * 100000000) + " Russbucks",
        }}
        rightElement={c >= 0 ? 'trending-up': 'trending-down'}
        onPress={() => {navigate.navigate(a)}}
      />
      
    </View>
  );
}

export default class InvestmentScreen extends React.Component {
  static navigationOptions = {
    title: 'My Portfolio',
    headerTintColor: "#c8d6e5",
    headerStyle: {
      backgroundColor: '#222f3e',
      borderBottomColor: '#222f3e',
    },
  };

    constructor(props) { 
        super(props); 
        this.state = { 
            DATA: []
        }; 
    } 

    componentDidMount() {
        const that = this;
        AsyncStorage.getItem("userToken", (errs,result) => {
            console.log(result)
            db.collection('myInvestments')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    that.state.DATA.push(doc.data());
                });

            })
        });
    }

    componentDidUpdate() {
        const that = this;
        AsyncStorage.getItem("userToken", (errs,result) => {
            console.log(result)
            db.collection('myInvestments')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    that.state.DATA.push(doc.data());
                });

            })
        });
    }

  render() {

    return (
      <View style={styles.container}>
          <FlatList
          data={this.state.DATA}
          renderItem={({ item }) => <Item Name={item.Name} Goal={item.Goal} Margin={item.Margin} navigate = {this.props.navigation} />}
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
