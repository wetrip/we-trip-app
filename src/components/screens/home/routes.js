import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import PlaceDetailContainer from '../../common/place-detail/PlaceDetailContainer';
import CONSTANTS from '../../../utils/CONSTANTS';
import Header from './components/Header';
import appStyles from '../../../styles';
import Home from './HomeContainer';

const ROUTE_NAMES = {
  HOME: 'HOME',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        headerBackTitle: null,
        header: props => <Header
          {...props}
          navigation={navigation}
        />,
      }),
    },

    [CONSTANTS.ROUTES.PLACE_DETAIL]: {
      screen: PlaceDetailContainer,
      navigationOptions: () => ({
        headerTintColor: appStyles.colors.textColor,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        },
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
