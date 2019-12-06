import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../components/SignInScreen';
import AuthLoadingScreen from '../components/AuthLoadingScreen';
import SignUpScreen from '../components/SignUpScreen';
import PonziScreen from '../screens/PonziScreen';

// const AppStack = createStackNavigator({ Main: MainTabNavigator });
const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen, Loading: PonziScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainTabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

// export default createAppContainer(
//   createSwitchNavigator({
//     // You could add another route here for authentication.
//     // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//     Main: MainTabNavigator,
//   })
// );
