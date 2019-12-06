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

import { Card } from "react-native-material-ui";

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

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Card>
            <Text>Hello world!</Text>
          </Card>
        </View>
        <ScrollView style={styles.invest_container}>
          <Text style={styles.subText}>Current Investments</Text>
          <View style={styles.investGroup}>
            <Text style={styles.investText}>Joe's Shitty Scheme</Text>
            <Text style={styles.investTextEnd}>-$10231</Text>
          </View>
          <View style={styles.investGroup}>
            <Text style={styles.investText}>
              Jack's "literally can't lose money" trashcan of money
            </Text>
            <Text style={styles.investTextEnd}>-$121</Text>
          </View>
          <View style={styles.investGroup}>
            <Text style={styles.investText}>
              Han's Roulette Investment Fund
            </Text>
            <Text style={styles.investTextEndGood}>$2312</Text>
          </View>
          <View style={styles.investGroup}>
            <Text style={styles.investText}>Chirag's Leverage Loophole</Text>
            <Text style={styles.investTextEndGood}>$290123</Text>
          </View>
        </ScrollView>
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
  }
});
