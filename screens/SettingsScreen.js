import React from "react";
import { ExpoConfigView } from "@expo/samples";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native";
import { Card, Button } from "react-native-material-ui";


export default function SettingsScreen({ navigation }) {
 
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
        <Text style={styles.moneyText}>1,000,000 RussBucks</Text>
        <Text style={styles.subText}>currently free to invest</Text>
      </View>
     
        
        <Button title="Sign out"  text="Sign Out" onPress={this._signOutAsync} />
        <Button
          backgroundColor="red"
          title="Add more money"
          text="Check My Investments"
          onPress={() => navigation.navigate("Investment")}
        />

      <View style={styles.money}>
        <Button
          backgroundColor="red"
          title="Add a card"
          text="Add a card"

          onPress={() => navigation.navigate("Card")}
        />
      </View>
    </View>
  );

  
}

SettingsScreen.navigationOptions = {
  title: "User Profile"
};

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
  invest_container: {
    flex: 3,
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
    flex: 1,
    backgroundColor: "#fff"
  },
  money: {
    flex: 1,
    marginTop: 10,
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
  },
  button: {
    color: "red"
  }
});
