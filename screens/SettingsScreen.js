import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={
            __DEV__
              ? require('../assets/images/robot-dev.png')
              : require('../assets/images/robot-prod.png')
          }
          style={styles.welcomeImage}
        />
      </View>
      <View style={styles.money} >
        <Text style={styles.moneyText}>$16,232</Text>
        <Text style={styles.subText}>currently free to invest</Text>
      </View>
      <ScrollView
        style={styles.container}>
           <Text style={styles.subText}>Current Investments</Text>
            <View style={styles.investGroup}>
              <Text style={styles.investText}>Joe's Shitty Scheme</Text>
              <Text style={styles.investTextEnd}>-$10231</Text>
            </View>
            <View style={styles.investGroup}>
              <Text style={styles.investText}>Jack's "literally can't lose money" trashcan of money</Text>
              <Text style={styles.investTextEnd}>-$121</Text>
            </View>
            <View style={styles.investGroup}>
              <Text style={styles.investText}>Han's Roulette Investment Fund</Text>
              <Text style={styles.investTextEndGood}>$2312</Text>
            </View>
            <View style={styles.investGroup}>
              <Text style={styles.investText}>Chirag's Leverage Loophole</Text>
              <Text style={styles.investTextEndGood}>$290123</Text>
            </View>
      </ScrollView>
      <View style={styles.money} >
        <Text style={styles.subText}>Add more money</Text>
      </View>
    </View>
  );

}

SettingsScreen.navigationOptions = {
  title: 'User Profile',
};

const styles = StyleSheet.create({
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  moneyText: {
    fontSize: 41,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  subText: {
    fontSize: 21,
    color: 'rgba(96,100,109, 0.8)',
    textAlign: 'center',
  },
  top: {
    flex: 1,
    backgroundColor: '#fff',
  },
  money: {
    flex: 1,
    backgroundColor: '#fff',
  },
  investGroup: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginTop: 3,
    borderBottomWidth:2,
    borderBottomColor: '#7A8385',

  },
  investText: {
    fontSize: 15,
    width: 200,
    color: 'rgba(96,100,109, 0.8)',
  },
  investTextEnd: {
    fontSize: 15,
    color: '#CB3438',
  },
  investTextEndGood: {
    fontSize: 15,
    color: '#52C43B',
  },
});