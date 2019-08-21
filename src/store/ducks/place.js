import Reactotron from 'reactotron-react-native';

export const Types = {
  GET_PLACE_REQUEST: '@place/GET_PLACE_REQUEST',
  GET_PLACE_SUCCESS: '@place/GET_PLACE_SUCCESS',
  GET_PLACE_FAILURE: '@place/GET_PLACE_FAILURE',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
  data: null,
};

export const Creators = {
  getPlace: id => ({
    type: Types.GET_PLACE_REQUEST,
    payload: { id },
  }),

  getPlaceSuccess: place => ({
    type: Types.GET_PLACE_SUCCESS,
    payload: { place },
  }),

  getPlaceFailure: () => ({
    type: Types.GET_PLACE_FAILURE,
  }),
};

const place = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_PLACE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        data: null,
      };

    case Types.GET_PLACE_SUCCESS:
        {
            Reactotron.log("GET_PLACE_SUCCESS", payload.place);

            return {
                ...state,
                loading: false,
                data: payload.place,
            };
        }

    case Types.GET_PLACE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default place;
