import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import Header from './components/Header';
import Home from './HomeComponent';

const ROUTE_NAMES = {
  HOME: 'HOME',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: props => <Header
          {...props}
          navigation={navigation}
        />,
      }),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.HOME,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerMode: 'screen',
  },
);

RootStack.navigationOptions = ({ navigation }) => {
  const tabBarVisible = navigation.state.index <= 0;

  return {
    tabBarVisible,
  };
};

export default RootStack;
