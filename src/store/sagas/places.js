import { call, put } from 'redux-saga/effects';

import parseParams from './utils/parseParams';
import api from '../../services/api';

import { Creators as PlacesCreators } from '../ducks/places';

export function* getPlaces({ payload }) {
  try {
    const { userLocation, queryParams } = payload;
    const requestParams = {};
    let headers = {};

    if (userLocation) {
      headers = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      };
    }

    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key]) {
        requestParams[key] = queryParams[key];
      }
    });

    const { data } = yield call(api.get, '/pointsOfInterest', {
      paramsSerializer: params => parseParams(params),
      params: requestParams,
      headers,
    });

    yield put(PlacesCreators.getPlacesSuccess(data));
  } catch {
    yield put(PlacesCreators.getPlacesFailure());
  }
}
