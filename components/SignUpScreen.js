import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import { Card, Button } from "react-native-material-ui";
import t from 'tcomb-form-native';
var _ = require('lodash');

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

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
});

const options = {
  fields: {
    username: {
      error: 'Add a username, you kinda need one. Idk what you are even thinking.',
      stylesheet: stylesheet
    },
    password: {
      error: 'Do you want anybody to access your account?',
      stylesheet: stylesheet
    },
  },
};

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

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Create an Account',
    headerTintColor: "#c8d6e5",
    headerStyle: {
      backgroundColor: '#10ac84',
      borderBottomColor: '#10ac84',
    },
  };
  
    render() {
      return (
        <View style={styles.container}>
          <View style={{paddingTop: 100}}>
            <Form 
            ref={c => this._form = c}
            type={User} 
            options={options}
            />
          </View>
          <Button title="test" text="Create Account!" onPress={this._createAccountAsync} style={{ text: { color: "#c8d6e5" } }}/>
          <Button title="test" text="Already have an account? Sign in here!" onPress={() => this.props.navigation.navigate('SignIn')} style={{ text: { color: "#feca57" } }}/>
        </View>
      );
    }
  
    _createAccountAsync = async () => {
      const value = this._form.getValue(); // use that ref to get the form value
      const nav = this.props.navigation;
      if (value) {
        db.collection('users').where("username", "==", value["username"])
        .get()
        .then(function(querySnapshot) {
          if (querySnapshot.empty) {
            db.collection('users').add({
              username: value["username"],
              password: value["password"],
              money: 1000000
            })
            .then(function(docRef) {
              AsyncStorage.setItem('userToken', value["username"]);
              nav.navigate('Loading');
            });
          }
        })
      }
    };
  }
  
// export default class SignInScreen extends React.Component {
//     static navigationOptions = {
//         header: null,
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <View>
//                 <Button
//                     title="Press me"
//                     onPress={() => Alert.alert('Simple Button pressed')}
//                 />
//                 </View>
//             </View>
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#10ac84"
    }
});