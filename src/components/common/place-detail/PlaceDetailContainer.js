// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaceCreators } from '../../../store/ducks/place';

import PlaceDetailComponent from './components/PlaceDetailComponent';
import CONSTANTS from '../../../utils/CONSTANTS';

type LatLng = {
  longitude: number,
  latitude: number,
};

type OperatingHours = {
  dayOfWeek: number,
  closeAt: string,
  openAt: string,
};

type PricesType = {
  priceTypeId: number,
  price: string,
};

type Ticket = {
  isAccessible: boolean,
  stationName: string,
  description: string,
  isNocturne: boolean,
  isDiurnal: boolean,
  id: number,
};

type Transport = {
  transportTypeId: number,
  tickets: Array<Ticket>,
  price: string,
};

type Price = {
  priceTypeId: number,
  price: string,
};

type Category = {
  name: string,
  id: number,
};

type Place = {
  operatingHours: Array<OperatingHours>,
  transports: Array<Transport>,
  categories: Array<Category>,
  distanceToUser: number,
  images: Array<string>,
  prices: Array<Price>,
  description: string,
  location: LatLng,
  isOpen: boolean,
  name: string,
  id: number,
};

type Props = {
  getPlace: Function,
  navigation: Object,
  loading: boolean,
  error: boolean,
  place: Place,
};

class PlaceDetailContainer extends Component<Props, {}> {
  componentDidMount() {
    const { navigation, getPlace } = this.props;

    const { params } = navigation.state;

    getPlace(params[CONSTANTS.PARAMS.PLACE_ID]);
  }

  render() {
    const { loading, error, place } = this.props;

    return (
      <PlaceDetailComponent
        loading={loading}
        error={error}
        place={place}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PlaceCreators, dispatch);

const mapStateToProps = state => ({
  loading: state.place.loading,
  error: state.place.error,
  place: state.place.data,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceDetailContainer);
