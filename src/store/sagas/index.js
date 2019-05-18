import { takeLatest, all } from 'redux-saga/effects';

import { Types as PlacesTypes } from '../ducks/places';

import { getAllPlaces } from './places';

export default function* rootSaga() {
  return yield all([
    takeLatest(PlacesTypes.GET_ALL_PLACES_REQUEST, getAllPlaces),
  ]);
}
