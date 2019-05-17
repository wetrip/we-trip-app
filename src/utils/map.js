// @flow

import { PixelRatio, Platform } from 'react-native';

import CONSTANTS from './CONSTANTS';
import appStyles from '../styles';

export const getInitialRegion = (): Object => ({
  latitude: CONSTANTS.VALUES.INITIAL_MAP_REGION.latitude,
  longitude: CONSTANTS.VALUES.INITIAL_MAP_REGION.longitude,
  longitudeDelta: CONSTANTS.VALUES.LONGITUDE_DELTA,
  latitudeDelta: CONSTANTS.VALUES.LATITUDE_DELTA,
});

export const getMapEdgePadding = (): Object => {
  const bottomEdgePaddingValue = appStyles.metrics.getWidthFromDP('16%')
    + appStyles.metrics.getHeightFromDP('16%');

  const padding = Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(50) : 50;

  const edgePadding = {
    top: padding,
    right: padding,
    bottom: Platform.select({
      android: PixelRatio.getPixelSizeForLayoutSize(bottomEdgePaddingValue),
      ios: bottomEdgePaddingValue,
    }),
    left: padding,
  };

  return edgePadding;
};
