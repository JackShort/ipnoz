import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View, Text
} from "react-native";
import { Card, Button } from "react-native-material-ui";
import { Ionicons } from '@expo/vector-icons';
import { Container } from 'native-base';
import * as Font from 'expo-font';
import Dialog from "react-native-dialog";


import * as SMS from 'expo-sms';

import RNShake from "react-native-shake";
import ShakeEventExpo from "../components/ShakeEventExpo";

export default class WeWork extends React.Component {
  static navigationOptions = {
    title: 'WeWork',
    headerTintColor: "#c8d6e5",
    headerStyle: {
      backgroundColor: '#222f3e',
      borderBottomColor: '#222f3e',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      money: 0,
      dialogVisible: false
    };
  }
  async sendNudes() {
 
    const { result } = await SMS.sendSMSAsync(
        ['9876543210'],
        "I just got robbed blind. Please spot me some cash so I don't have to foreclose my house and so I can feed my kids." 
      );
      this.setState({ dialogVisible: false });


}
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('../node_modules/native-base/Fonts/Roboto.ttf'),
      ...Ionicons.font,
    })
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

    _loseMoneyAsync = async () => {
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
                money: money - value,
            })
            .then(function() {
              this.props.navigation.navigate("App");
            });
        });
    };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>WeWork</Text>
          <Image
            source={
              __DEV__
                ? require("../assets/images/wework.jpeg")
                : require("../assets/images/robot-prod.png")
            }
            style={styles.welcomeImage}
          />
        </View>
        <ScrollView>
          <Text style={styles.moneyText}>
            Russ Hanneman (played by Chris Diamantopoulos), the embodiment of an
            Affliction model-meets-dot com mogul, comes to Pied Piper’s rescue
            by offering them the chance to design the network for his eponymous
            celebration of leather pants, vanity tequila and Puddle of Mudd.
            RussFest aims to be everything people hoped the doomed Fyre Festival
            would be, and everything original Burners hate about how their
            festival has changed.
          </Text>
        </ScrollView>
       
        <Button
          title="Show Dialog"
          text="Invest 30,000,000,000 RussBucks"
          onPress={this.showDialog}
          style={{ container: { backgroundColor: '#0abde3' }, text: { color: "#c8d6e5", fontWeight: "bold" } }}
        />
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Thank You!</Dialog.Title>
          <Dialog.Description>
          "Congrats! You are now an investor! If you didn't have enough money in your account to make this transaction that's ok, we'll cover it. You'll just owe us the balance at a low low interest rate of 6% daily!"
          </Dialog.Description>
          <Dialog.Button label="OK" onPress={this.handleCancel} />
          <Dialog.Button label="Share" onPress={this.sendNudes} />
        </Dialog.Container>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: 300,
    height: 240,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
    alignSelf: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#222f3e"
  },
  title: {
    fontSize: 30,
    color: "#c8d6e5",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10
  },
  subText: {
    fontSize: 21,
    color: "rgba(96,100,109, 0.8)",
    textAlign: "center"
  },
  top: {
    backgroundColor: "#222f3e"
  },
  money: {
    flex: 1,
    backgroundColor: "#222f3e"
  },
  addMoney: {
    flex: 3,
    backgroundColor: "#fff"
  },
  investGroup: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: 3,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#8c90c3"
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
  moneyText: {
    color: "#c8d6e5"
  },
  investButton: {
    color: "#c8d6e5",
    backgroundColor: "#0abde3"
  }
});