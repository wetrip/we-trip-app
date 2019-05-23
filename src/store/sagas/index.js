import { takeLatest, all } from 'redux-saga/effects';

import { Types as PlacesTypes } from '../ducks/places';

import { getPlaces } from './places';

export default function* rootSaga() {
  return yield all([takeLatest(PlacesTypes.GET_PLACES_REQUEST, getPlaces)]);
}
