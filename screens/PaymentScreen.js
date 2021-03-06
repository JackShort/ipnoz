import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Card, Button } from "react-native-material-ui";
var _ = require('lodash');

import Stripe from "../components/Stripe";
const STRIPE_PUBLISHABLE_KEY = "sk_test_YTNaU7ltaRo9DMKYYxqr6g3s00yCuz7Znv";

const client = new Stripe(STRIPE_PUBLISHABLE_KEY);
// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// overriding the text color
stylesheet.textbox.normal.color = '#c8d6e5';
stylesheet.controlLabel.normal.color = '#c8d6e5';
stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomColor = '#576574';
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;

import { firebase } from "@firebase/app";
import "@firebase/firestore";
import { parse } from "qs";
const firebaseConfig = {
  apiKey: "AIzaSyDeC0z-nYBAquUosqYmQ31m0m4KeWRd7rk",
  authDomain: "ipnoz-6d6b3.firebaseapp.com",
  databaseURL: "ipnoz-6d6b3.firebaseio.com",
  projectId: "ipnoz-6d6b3",
  storageBucket: "ipnoz-6d6b3.appspot.com"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

import t from "tcomb-form-native";
var tokenID;
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
      stylesheet: stylesheet
    }
  }
};

export default class PaymentScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Money',
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
    AsyncStorage.getItem("userToken", (errs, result) => {
      db.collection("users")
        .where("username", "==", result)
        .get()
        .then(function(querySnapshot) {
          var money;
          querySnapshot.forEach(function(doc) {
            that.setState({ money: doc.data()["money"] });
          });
        });
    });
  }
  

  _addMoneyAsync = async() => {
    const { navigation } = this.props;

    const that = this;
    const value = this._form.getValue()["value"]; // use that ref to get the form value
    var username = await AsyncStorage.getItem("userToken");

    const customer = await client.createCustomer(
      tokenID,
      "customer@email.com",
      "<Your user ID>",
      "hn",
      "Doe"
    );

    // Create charge, 1 USD
    const charge = await client.createCharge(
      value * 100,
      customer.id,
      "Payment example",
      "USD"
    );
    db.collection("users")
      .where("username", "==", username)
      .get()
      .then(function(querySnapshot) {
        var d = querySnapshot.docs[0];
        var id = d.id;
        var money = d.data()["money"];
        var username = d.data()["username"];
        var password = d.data()["password"];

        db.collection("users")
          .doc(id)
          .set({
            username: username,
            password: password,
            money: money + value
          })
          .then(function() {
            that.setState({ money: money + value });
          });
      });
      navigation.navigate('Settings')

  };
  render() {
     tokenID = this.props.navigation.getParam("text", "nothing sent");

    return (
      <View style={styles.addMoney}>
        <View>
          <Form ref={c => (this._form = c)} type={Money} options={options} />

          <Button
            title="Add more money"
            text="MAKE YOUR DEPOSIT"
            style={{ text: { color: "#0abde3" } }}
            onPress={this._addMoneyAsync}
          />
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
    backgroundColor: "#222f3e"
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
    backgroundColor: "#fff"
  },
  money: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: "#222f3e"
  },
  addMoney: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: "#222f3e"
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
  }
});
