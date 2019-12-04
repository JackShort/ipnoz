import RNShakeEvent from 'react-native-shake-event';
import React from 'react';
import AppNav from '../navigation/AppNavigator.js'

export default class Shaker extends React.Component {
  componentDidMount() {
    RNShakeEvent.addEventListener('shake', () => {
      console.log("Shaking worked")
    });
  }

  componentDidUpdate() {
      this.shaken = RNShakeEvent.addEventListener('shake', () => {
      console.log('Device shake!');
    });
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  render() {return null}
}