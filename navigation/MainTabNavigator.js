import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, BottomTabBar } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MoneyScreen from '../screens/MoneyScreen';
import CardScreen from '../screens/CardScreen';
import RussFest from '../screens/RussFest';
import WeWork from '../screens/WeWork';



import InvestmentScreen from '../screens/InvestmentScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    RussFest: RussFest,
    WeWork: WeWork,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Money: MoneyScreen,
    Card: CardScreen,
    Investment: InvestmentScreen,

    
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const TabBarComponent = props => <BottomTabBar {...props} />;

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SettingsStack,
},
{
  tabBarComponent: props => (
    <TabBarComponent {...props} style={{ backgroundColor: "#222f3e", borderTopColor: '#222f3e', activeBackgroundColor: "#0abde3" }} />
  ),
});

tabNavigator.path = '';

export default tabNavigator;
