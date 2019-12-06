import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default class InvestButton extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.moneyButton}>10/4</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      },
      moneyButton:{
          color: "#0abde3",
          fontWeight: 'bold'
      }
});