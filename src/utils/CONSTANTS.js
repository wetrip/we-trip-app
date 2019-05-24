import appStyles from '../styles';

const ROUTES = {
  PLACE_DETAIL: 'PLACE_DETAIL',
};

const PARAMS = {
  SHOULD_RESET_SEARCH_INPUT: 'SHOULD_RESET_SEARCH_INPUT',
  CHANGE_HOME_SCREEN_TYPE: 'CHANGE_HOME_SCREEN_TYPE',
  ON_TOGGLE_DARK_LAYER: 'ON_TOGGLE_DARK_LAYER',
  ON_TYPE_PLACE_NAME: 'ON_TYPE_PLACE_NAME',
  ON_SEARCH_PLACE: 'ON_SEARCH_PLACE',
  TOGGLE_FILTER: 'TOGGLE_FILTER',
  TOUR_SELECTED: 'TOUR_SELECTED',
  PLACE_ID: 'PLACE_ID',
};

const ASPECT_RATIO = appStyles.metrics.width / appStyles.metrics.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const VALUES = {
  LIMIT_ITEMS_RECEIVED_PER_REQUEST: 10,
  INITIAL_MAP_REGION: {
    latitude: -3.71839,
    longitude: -38.5434,
  },
  LONGITUDE_DELTA,
  LATITUDE_DELTA,
  TYPE_TRANSPORTS: {
    1: {
      icon: 'train',
      label: 'Comboio',
    },
    2: {
      icon: 'subway',
      label: 'Metro',
    },
    3: {
      icon: 'tram',
      label: 'Eletrico',
    },
    4: {
      label: 'Auto-Carro',
      icon: 'bus',
    },
    5: {
      label: 'Barca',
      icon: 'ferry',
    },
  },
  TYPE_PRICES_TICKETS: {
    1: 'Adult',
    2: 'Senior',
    3: 'Child',
    4: 'Students',
  },
  DAYS_OF_WEEK: {
    0: 'MON',
    1: 'TUE',
    2: 'WED',
    3: 'THR',
    4: 'FRI',
    5: 'SAT',
    6: 'SUN',
  },
};

export default {
  ROUTES,
  PARAMS,
  VALUES,
};
