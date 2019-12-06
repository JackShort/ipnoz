import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const User = t.struct({
  username: t.String,
  password: t.String,
});

const options = {
  fields: {
    username: {
      error: 'Add a username, you kinda need one. Idk what you are even thinking.'
    },
    password: {
      error: 'Do you want anybody to access your account?'
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

export default class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Form 
          ref={c => this._form = c}
          type={User} 
          options={options}
          />
          <Button title="Sign in!" onPress={this._signInAsync} />
          <Button title="Don't have an account? Create one here!" onPress={() => this.props.navigation.navigate('SignUp')} />
        </View>
      );
    }
  
    _signInAsync = async () => {
      const value = this._form.getValue(); // use that ref to get the form value
      const nav = this.props.navigation;
      if (value) {
        db.collection('users').where("username", "==", value["username"]).where("password", "==", value["password"])
        .get()
        .then(function(querySnapshot) {
          if (!querySnapshot.empty) {
            AsyncStorage.setItem('userToken', value["username"]);
            nav.navigate('Loading');
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
        marginTop: 50,
        padding: 20,
    }
});