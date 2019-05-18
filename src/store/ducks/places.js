export const Types = {
  GET_NEARBY_PLACES: 'GET_NEARBY_PLACES',
};

const INITIAL_STATE = {
  loadingNearbyPlaces: false,
  loadingSinglePlace: false,
  error: false,
  place: null,
  places: [],
};

export const Creators = {
  getNearbyPlaces: userLocation => ({
    type: Types.GET_NEARBY_PLACES,
  }),
};

const places = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case Types.GET_NEARBY_PLACES:
      return {
        ...state,
        places: [],
        loadingNearbyPlaces: true,
        error: false,
      };

    default:
      return state;
  }
};

export default places;
