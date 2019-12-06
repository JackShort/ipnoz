import React from "react";
import { AsyncStorage } from "react-native";
import Stripe from "../components/Stripe";

import AddSubscriptionView from "../components/AddSubscriptionView";
const STRIPE_ERROR = "Payment service error. Try again later.";
const SERVER_ERROR = "Server error. Try again later.";
const STRIPE_PUBLISHABLE_KEY = "sk_test_YTNaU7ltaRo9DMKYYxqr6g3s00yCuz7Znv";
const client = new Stripe(STRIPE_PUBLISHABLE_KEY);

import { firebase } from "@firebase/app";
import "@firebase/firestore";
import { parse } from "qs";
import { StyleSheet, Text, View } from "react-native";
const firebaseConfig = {
  apiKey: "AIzaSyDeC0z-nYBAquUosqYmQ31m0m4KeWRd7rk",
  authDomain: "ipnoz-6d6b3.firebaseapp.com",
  databaseURL: "ipnoz-6d6b3.firebaseio.com",
  projectId: "ipnoz-6d6b3",
  storageBucket: "ipnoz-6d6b3.appspot.com"
};
import { Card, Button } from "react-native-material-ui";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React
 * Native apps isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */
const getCreditCardToken = creditCardData => {
  const card = {
    "card[number]": creditCardData.values.number.replace(/ /g, ""),
    "card[exp_month]": creditCardData.values.expiry.split("/")[0],
    "card[exp_year]": creditCardData.values.expiry.split("/")[1],
    "card[cvc]": creditCardData.values.cvc
  };
  return fetch("https://api.stripe.com/v1/tokens", {
    headers: {
      // Use the correct MIME type for your server
      Accept: "application/json",
      // Use the correct Content Type to send data to Stripe
      "Content-Type": "application/x-www-form-urlencoded",
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: "post",
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + "=" + card[key])
      .join("&")
  }).then(response => response.json());
};

_doPayment = async tokenID => {
  // const customer = await client.createCustomer(
  //   tokenID,
  //   "customer@email.com",
  //   "<Your user ID>",
  //   "John",
  //   "Doe"
  // );

  

  // Create charge, 1 USD
  //const charge = await client.createCharge(7 * 100, customer.id, 'Payment example','USD');
  //console.log(charge.id)
};

_addTokenSync = async tokenID => {
  var username = await AsyncStorage.getItem("userToken");
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
          money: money,
          token: tokenID
        });
    });
};

/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
const subscribeUser = creditCardToken => {
  return new Promise(resolve => {
    _doPayment(creditCardToken.id);
    //Send token to firebase
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};
/**
 * The main class that submits the credit card data and
 * handles the response from Stripe.
 */
export default class CardScreen extends React.Component {
  static navigationOptions = {
    title: "Add Your Card"
  };
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null,
      valid: true,
      id: '',
    };
  }
  // Handles submitting the payment request
  onSubmit = async creditCardInput => {
    const { navigation } = this.props;
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR });
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });
      //navigation.navigate('Home')
    }
    this.setState({ valid: false });
    this.setState({ id: creditCardToken.id });


  };

  // render the subscription view component and pass the props to it
  render() {
    const { submitted, error } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.big}>
          <AddSubscriptionView
            error={error}
            submitted={submitted}
            onSubmit={this.onSubmit}
          />
        </View>
        <View style={styles.smol}>
          <Button
            backgroundColor="red"
            title="Add a card"
            text="CONTINUE TO PAYMENT PAGE"
            disabled= {this.state.valid}
            onPress={() => this.props.navigation.navigate("PaymentScreen", {
              text: this.state.id
            })}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  big: {
    flexGrow: 1
  },
  smol: {
    flexShrink: 1
  },
  textWrapper: {
    margin: 10
  },
  infoText: {
    fontSize: 18,
    textAlign: "center"
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10
  }
});
