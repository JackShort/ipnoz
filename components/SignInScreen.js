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

export default class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };
  
    render() {
      return (
        <View>
          <Button title="Sign in!" onPress={this._signInAsync} />
        </View>
      );
    }
  
    _signInAsync = async () => {
      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };
  }
  
  class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome to the app!',
    };
  
    render() {
      return (
        <View>
          <Button title="Show me more of the app" onPress={this._showMoreApp} />
          <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        </View>
      );
    }
  
    _showMoreApp = () => {
      this.props.navigation.navigate('Other');
    };
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
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
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }
});