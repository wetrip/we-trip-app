import Reactotron from 'reactotron-react-native';

export const Types = {
  GET_PLACES_REQUEST: '@places/GET_PLACES_REQUEST',
  GET_PLACES_SUCCESS: '@places/GET_PLACES_SUCCESS',
  GET_PLACES_FAILURE: '@places/GET_PLACES_FAILURE',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
  data: [],
};

export const Creators = {
  getPlaces: (userLocation, queryParams) => ({
    type: Types.GET_PLACES_REQUEST,
    payload: { userLocation, queryParams },
  }),

  getPlacesSuccess: places => ({
    type: Types.GET_PLACES_SUCCESS,
    payload: { places },
  }),

  getPlacesFailure: () => ({
    type: Types.GET_PLACES_FAILURE,
  }),
};

const places = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_PLACES_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        data: [],
      };

    case Types.GET_PLACES_SUCCESS:
      {
        Reactotron.log("Logging paylod");
        Reactotron.log(payload);

      return {
        ...state,
        loading: false,
        data: payload.places.results,
      };
    }
    case Types.GET_PLACES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default places;
