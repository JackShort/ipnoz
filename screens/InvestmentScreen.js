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

import RNShake from 'react-native-shake';

export default class InvestmentScreen extends React.Component {
  static navigationOptions = {
    title: "Investment Portfolio"
  };
  constructor(props) {
    super(props);
    this.state = {
      money: 0
    };
  }
  componentWillMount() {
    console.log("hey")
    RNShake.addEventListener('ShakeEvent', () => {
      this.setState({money: "100"});
    });
  }
  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }
  render() {
    RNShake.addEventListener('ShakeEvent', () => {
      this.setState({money: "100"});
    });
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>RussFest</Text>
          <Image
            source={
              __DEV__
                ? require("../assets/images/gallery_medium.jpg")
                : require("../assets/images/robot-prod.png")
            }
            style={styles.welcomeImage}
          />
        </View>
        <ScrollView>
        <Text style={styles.moneyText}>${this.state.money}</Text>

        </ScrollView>
        <View style={styles.investGroup}>
          <Button
            onPress={() => {
              alert("Congrats! You are now an investor! If you didn't have enough money in your account to make this transaction that's ok, we'll cover it. You'll just owe us the balance at a low low interest rate of 6% daily!");
            }}
            title="Invest 10k RussBucks"
          />
        </View>
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
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    color: "rgba(96,100,109, 1)",
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
    justifyContent: "center",
    marginTop: 3,
    borderRadius: 10,
      borderWidth: 3,
      borderColor: '#8c90c3',

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
