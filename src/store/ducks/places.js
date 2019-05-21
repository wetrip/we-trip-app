export const Types = {
  GET_ALL_PLACES_REQUEST: 'GET_ALL_PLACES_REQUEST',
  GET_ALL_PLACES_SUCCESS: 'GET_ALL_PLACES_SUCCESS',
  GET_ALL_PLACES_FAILURE: 'GET_ALL_PLACES_FAILURE',
};

const INITIAL_STATE = {
  loadingSinglePlace: false,
  loadingAllPlaces: false,
  singlePlace: null,
  allPlaces: [],
  error: false,
};

export const Creators = {
  getAllPlaces: (userLocation, queryParams) => ({
    type: Types.GET_ALL_PLACES_REQUEST,
    payload: { userLocation, queryParams },
  }),

  getAllPlacesSuccess: places => ({
    type: Types.GET_ALL_PLACES_SUCCESS,
    payload: { places },
  }),

  getAllPlacesFailure: params => ({
    type: Types.GET_ALL_PLACES_FAILURE,
  }),
};

const places = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_ALL_PLACES_REQUEST:
      return {
        ...state,
        loadingAllPlaces: true,
        allPlaces: [],
        error: false,
      };

    case Types.GET_ALL_PLACES_SUCCESS:
      return {
        ...state,
        loadingAllPlaces: false,
        allPlaces: payload.places,
      };

    case Types.GET_ALL_PLACES_FAILURE:
      return {
        ...state,
        loadingAllPlaces: false,
        allPlaces: [],
        error: true,
      };

    default:
      return state;
  }
};

export default places;
