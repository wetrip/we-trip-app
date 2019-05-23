import { call, put } from 'redux-saga/effects';

import { Creators as PlaceCreators } from '../ducks/place';
import api from '../../services/api';

export function* getPlace({ payload }) {
  try {
    const { id } = payload;

    const { data } = yield call(api.get, `/pointsOfInterest/${id}`);

    yield put(PlaceCreators.getPlaceSuccess(data));
  } catch {
    yield put(PlaceCreators.getPlaceFailure());
  }
}
