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

import Stripe from "../components/Stripe";
const STRIPE_PUBLISHABLE_KEY = "sk_test_YTNaU7ltaRo9DMKYYxqr6g3s00yCuz7Znv";

const client = new Stripe(STRIPE_PUBLISHABLE_KEY);

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
    value: 10000
  }
};

export default class PaymentScreen extends React.Component {
  static navigationOptions = {
    title: "Add Money"
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
      console.log(result);
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
    const that = this;
    const value = this._form.getValue()["value"]; // use that ref to get the form value
    var username = await AsyncStorage.getItem("userToken");
    console.log(tokenID);

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
    console.log(charge.id);
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
            money: money + value * 1000000
          })
          .then(function() {
            that.setState({ money: money + value });
          });
      });
  };
  render() {
     tokenID = this.props.navigation.getParam("text", "nothing sent");
    console.log(tokenID);

    return (
      <View style={styles.addMoney}>
        <View>
          <Form ref={c => (this._form = c)} type={Money} options={options} />
        </View>

        <View style={styles.money}>
          <Button
            title="Add more money"
            text="Check My Investments"
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
    backgroundColor: "#fff"
  },
  money: {
    flex: 1,
    backgroundColor: "#fff"
  },
  addMoney: {
    flex: 3,
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
  }
});
