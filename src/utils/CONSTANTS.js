import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ROUTES = {
  PLACE_DETAIL: 'PLACE_DETAIL',
};

const PARAMS = {
  CHANGE_HOME_SCREEN_TYPE: 'CHANGE_HOME_SCREEN_TYPE',
  ON_TOGGLE_DARK_LAYER: 'ON_TOGGLE_DARK_LAYER',
  ON_TYPE_PLACE_NAME: 'ON_TYPE_PLACE_NAME',
  ON_SEARCH_PLACE: 'ON_SEARCH_PLACE',
  TOGGLE_FILTER: 'TOGGLE_FILTER',
};

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const VALUES = {
  INITIAL_MAP_REGION: {
    latitude: -3.7900894,
    longitude: -38.6590335,
  },
  LONGITUDE_DELTA,
  LATITUDE_DELTA,
};

export default {
  ROUTES,
  PARAMS,
  VALUES,
};
