import { takeLatest, all } from 'redux-saga/effects';

import { Types as PlacesTypes } from '../ducks/places';
import { Types as PlaceType } from '../ducks/place';
import { Types as ToursTypes } from '../ducks/tours';

import { getPlaces } from './places';
import { getPlace } from './place';
import { getTours } from './tours';

export default function* rootSaga() {
  return yield all([
    takeLatest(PlacesTypes.GET_PLACES_REQUEST, getPlaces),
    takeLatest(PlaceType.GET_PLACE_REQUEST, getPlace),
    takeLatest(ToursTypes.GET_TOURS_REQUEST, getTours),
  ]);
}
