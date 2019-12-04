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
import Stripe from 'react-native-stripe-api';
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


export default class MoneyScreen extends React.Component {
    static navigationOptions = {
      title: 'Add Money',
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
                    that.setState({ money: doc.data()["money"]});
                });

            })
        });
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
                    <Text style={styles.moneyText}>${this.state.money}</Text>
                    <Text style={styles.subText}>Current Balance</Text>
                </View>

                <View style={styles.addMoney}>
                    <View>
                        <Form
                            ref={c => (this._form = c)}
                            type={Money}
                            options={options}
                        />
                    </View>

                    <View style={styles.money}>
                        <Button title="Add" onPress={this._addMoneyAsync}/>
                    </View>
                </View>
            </View>
        );
    }

    _addMoneyAsync = async () => {
        const that = this;
        const value = this._form.getValue()["value"]; // use that ref to get the form value
        var username = await AsyncStorage.getItem("userToken");
        db.collection('users').where("username", "==", username)
        .get()
        .then(function(querySnapshot) {
            var d = querySnapshot.docs[0];
            var id = d.id;
            var money = d.data()["money"];
            var username = d.data()["username"]
            var password = d.data()["password"]

            db.collection('users').doc(id).set({
                username: username,
                password: password,
                money: money + value
            })
            .then(function() {
                that.setState({money: money + value});
            });
        });
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
