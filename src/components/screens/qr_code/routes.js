import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import QRCode from './QRCode';

const ROUTE_NAMES = {
  QR_CODE: 'QRCode',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.QR_CODE]: {
      screen: QRCode,
      navigationOptions: ({ navigation }) => ({
        title: 'QRCode',
      }),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.QR_CODE,
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
