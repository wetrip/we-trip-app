import React from 'react';
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';

import isEqualsOrLargestThanIphoneX from '../utils/isEqualsOrLargestThanIphoneX';
import Icon from '../components/common/Icon';
import appStyles from '../styles';

import SettingsRoutes from '../components/screens/settings/routes';
import QRCodeRoutes from '../components/screens/qr_code/routes';
import TourshRoutes from '../components/screens/tours/routes';
import HomeRoutes from '../components/screens/home/routes';

const ROUTE_NAMES = {
  HOME: 'HOME',
  TOURS: 'TOURS',
  QR_CODE: 'QR_CODE',
  SETTINGS: 'SETTINGS',
};

type Props = {
  tintColor: string,
};

const getTabIcon = (icon: string): Object => ({ tintColor }: Props) => (
  <Icon
    color={tintColor}
    name={icon}
    size={25}
  />
);

const AppTabs = createMaterialTopTabNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: HomeRoutes,
      navigationOptions: {
        tabBarIcon: getTabIcon('home'),
      },
    },
    [ROUTE_NAMES.TOURS]: {
      screen: TourshRoutes,
      navigationOptions: {
        tabBarIcon: getTabIcon('compass'),
      },
    },
    [ROUTE_NAMES.QR_CODE]: {
      screen: QRCodeRoutes,
      navigationOptions: {
        tabBarIcon: getTabIcon('qrcode-scan'),
      },
    },
    [ROUTE_NAMES.SETTINGS]: {
      screen: SettingsRoutes,
      navigationOptions: {
        tabBarIcon: getTabIcon('settings'),
      },
    },
  },
  {
    initialRouteName: ROUTE_NAMES.TOURS,
    tabBarPosition: 'bottom',
    optimizationsEnabled: true,
    animationEnabled: true,
    swipeEnabled: false,
    lazy: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        paddingBottom: isEqualsOrLargestThanIphoneX() ? 30 : 0,
        backgroundColor: appStyles.colors.defaultWhite,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      inactiveTintColor: appStyles.colors.inactiveTabIcon,
      activeTintColor: appStyles.colors.primaryColor,
    },
  },
);

const AppContainer = createAppContainer(AppTabs);

export default AppContainer;
