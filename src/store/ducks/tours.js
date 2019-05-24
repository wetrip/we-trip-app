export const Types = {
  GET_TOURS_REQUEST: '@tours/GET_TOURS_REQUEST',
  GET_TOURS_SUCCESS: '@tours/GET_TOURS_SUCCESS',
  GET_TOURS_FAILURE: '@tours/GET_TOURS_FAILURE',
};

const INITIAL_STATE = {
  loading: false,
  error: false,
  data: [],
};

export const Creators = {
  getTours: (userLocation, queryParams) => ({
    type: Types.GET_TOURS_REQUEST,
    payload: { userLocation, queryParams },
  }),

  getToursSuccess: tours => ({
    type: Types.GET_TOURS_SUCCESS,
    payload: { tours },
  }),

  getToursFailure: () => ({
    type: Types.GET_TOURS_FAILURE,
  }),
};

const tours = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_TOURS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        data: [],
      };

    case Types.GET_TOURS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.tours,
      };

    case Types.GET_TOURS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default tours;
