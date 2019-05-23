import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import PlaceDetailContainer from '../../common/place-detail/PlaceDetailContainer';
import TourDetail from './components/tour-detail/TourDetail';
import CONSTANTS from '../../../utils/CONSTANTS';
import appStyles from '../../../styles';
import Tours from './ToursContainer';

const LOCAL_ROUTES = {
  TOUR_DETAIL: 'TOUR_DETAIL',
  TOURS: 'TOURS',
};

const RootStack = createStackNavigator(
  {
    [LOCAL_ROUTES.TOURS]: {
      screen: props => <Tours
        {...props}
        localRoutes={LOCAL_ROUTES}
      />,
      navigationOptions: ({ navigation }) => ({
        title: 'Tours',
        headerBackTitle: null,
      }),
    },

    [LOCAL_ROUTES.TOUR_DETAIL]: {
      screen: TourDetail,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: appStyles.colors.textColor,
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: appStyles.colors.white,
          borderBottomWidth: 0,
          elevation: 0,
        },
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
    initialRouteName: LOCAL_ROUTES.TOURS,
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
