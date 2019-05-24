import { call, put } from 'redux-saga/effects';

import { Creators as TourCreators } from '../ducks/tours';
import api from '../../services/api';

export function* getTours({ payload }) {
  try {
    const { data } = yield call(api.get, '/tours');

    yield put(TourCreators.getToursSuccess(data));
  } catch {
    yield put(TourCreators.getToursFailure());
  }
}
