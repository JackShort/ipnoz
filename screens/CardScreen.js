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
  View,
  Button
} from "react-native";
import Stripe from "react-native-stripe-api";

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


export default class CardScreen extends React.Component {
  static navigationOptions = {
    title: "Add A Card"
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.money}>
          <Button title="Add" onPress={this._addMoneyAsync} />
        </View>
      </View>
    );
  }

  _addMoneyAsync = async () => {
    const apiKey = "sk_test_YTNaU7ltaRo9DMKYYxqr6g3s00yCuz7Znv";
    const client = new Stripe(apiKey);

    const token = await client.createToken({
        cardNumber: "4242424242424242",
      expMonth: "09",
      expYear: "20",
      cvc: "111",
    });
    
    const customer = await client.createCustomer(
      token.id,
      "customer@email.com",
      "<Your user ID>",
      "John",
      "Doe"
    );

    

    const charge = await client.createCharge(1 * 100, customer.id, 'Payment example','USD');
    Alert.alert(
        charge
     )
  };
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
