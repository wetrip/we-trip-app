import { createStackNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import Tours from './Tours';

const ROUTE_NAMES = {
  TOURS: 'TOURS',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.TOURS]: {
      screen: Tours,
      navigationOptions: ({ navigation }) => ({
        title: 'TOURS',
      }),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.TOURS,
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
