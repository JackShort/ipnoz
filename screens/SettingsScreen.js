import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native";
import { Card, Button } from "react-native-material-ui";

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

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'User Profile',
    headerTintColor: "#c8d6e5",
    headerStyle: {
      backgroundColor: '#222f3e',
      borderBottomColor: '#222f3e',
    },
  };

    constructor(props) { 
        super(props); 
        this.state = { 
            money: 0
        }; 
    } 

    componentDidMount() {
        const that = this;
        AsyncStorage.getItem("userToken", (errs,result) => {
            console.log(result)
            db.collection('users').where("username", "==", result)
            .get()
            .then(function(querySnapshot) {
                var money;
                querySnapshot.forEach(function(doc) {
                    that.setState({ money: doc.data()["money"] * 1000000000});
                });

            })
        });
    }

    componentWillUpdate() {
        const that = this;
        AsyncStorage.getItem("userToken", (errs,result) => {
            console.log(result)
            db.collection('users').where("username", "==", result)
            .get()
            .then(function(querySnapshot) {
                var money;
                querySnapshot.forEach(function(doc) {
                    that.setState({ money: doc.data()["money"] * 1000000000});
                });

            })
        });
    }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  currencyFormat(num) {
    num = String(num)
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            source={
              __DEV__
                ? require("../assets/images/robot-dev.png")
                : require("../assets/images/robot-prod.png")
            }
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.money}>

          <Text style={styles.moneyText}>{this.currencyFormat(this.state.money)} RussBucks</Text>
          <Text style={styles.subText}>currently free to invest</Text>
        </View>
          
          
          <Button
            backgroundColor="red"
            title="Add more money"
            text="Check My Investments"
            onPress={() => this.props.navigation.navigate("Investment")}
          />

        <View style={styles.money}>
          <Button
            backgroundColor="red"
            title="Add a card"
            text="Add a card"

            onPress={() => this.props.navigation.navigate("Card")}
          />
          <Button title="Sign out"  text="Sign Out" onPress={this._signOutAsync} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
    alignSelf: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  invest_container: {
    flex: 3,
    backgroundColor: "#fff"
  },
  moneyText: {
    fontSize: 41,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  subText: {
    fontSize: 21,
    color: "rgba(96,100,109, 0.8)",
    textAlign: "center"
  },
  top: {
    flex: 1,
    backgroundColor: "#fff"
  },
  money: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#fff"
  },
  investGroup: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginTop: 3,
    borderBottomWidth: 2,
    borderBottomColor: "#7A8385"
  },
  investText: {
    fontSize: 15,
    width: 200,
    color: "rgba(96,100,109, 0.8)"
  },
  investTextEnd: {
    fontSize: 15,
    color: "#CB3438"
  },
  investTextEndGood: {
    fontSize: 15,
    color: "#52C43B"
  },
  button: {
    color: "red"
  }
});
