import React from "react";
import {
    ActivityIndicator,
    AsyncStorage,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Alert
} from "react-native";
import t from "tcomb-form-native";

const Form = t.form.Form;

const User = t.struct({
    username: t.String,
    password: t.String
});

const options = {
    fields: {
        username: {
            error:
                "Add a username, you kinda need one. Idk what you are even thinking."
        },
        password: {
            error: "Do you want anybody to access your account?"
        }
    }
};

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

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate("App");
        }, 4500);
    }

    render() {
        return (
            <View style={{ backgroundColor: "#30CC9B" }}>
                <Image
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    source={require("../assets/images/ipnoz.gif")}
                />
            </View>
        );
    }
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

const styles = StyleSheet.create({});
