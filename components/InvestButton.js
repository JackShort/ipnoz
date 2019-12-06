import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default class InvestButton extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.moneyButton}>{this.props.ROI}</Text>
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