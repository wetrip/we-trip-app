import { call, put } from 'redux-saga/effects';

import { Creators as TourCreators } from '../ducks/tours';
import parseParams from './utils/parseParams';
import CONSTANTS from '../../utils/CONSTANTS';
import api from '../../services/api';

export function* getTours({ payload }) {
  try {
    const { queryParams } = payload;
    const requestParams = {
      _limit: CONSTANTS.VALUES.LIMIT_ITEMS_RECEIVED_PER_REQUEST,
    };

    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key]) {
        requestParams[key] = queryParams[key];
      }
    });

    const { data } = yield call(api.get, '/tours', {
      paramsSerializer: params => parseParams(params),
      params: requestParams,
    });

    yield put(TourCreators.getToursSuccess(data));
  } catch {
    yield put(TourCreators.getToursFailure());
  }
}
