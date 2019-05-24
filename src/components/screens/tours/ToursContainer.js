// @flow

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as ToursCreators } from '../../../store/ducks/tours';

import ToursComponent from './components/ToursComponent';
import CONSTANTS from '../../../utils/CONSTANTS';

type LatLng = {
  longitude: number,
  latitude: number,
};

type Place = {
  distanceToUser: number,
  image: Array<string>,
  location: LatLng,
  isOpen: boolean,
  name: string,
  id: number,
};

type Tour = {
  destinations: Array<Place>,
  description: string,
  image: string,
  title: string,
  id: number,
};

type Props = {
  getTours: Function,
  tours: Array<Tour>,
  loading: boolean,
  error: boolean,
};

class ToursContainer extends Component<Props, {}> {
  componentDidMount() {
    const { getTours } = this.props;

    getTours();
  }

  onSelectTour = (tour: Tour): void => {
    const { navigation, localRoutes } = this.props;

    navigation.navigate(localRoutes.TOUR_DETAIL, {
      [CONSTANTS.PARAMS.TOUR_SELECTED]: tour,
    });
  };

  render() {
    const { loading, tours, error } = this.props;

    return (
      <ToursComponent
        onSelectTour={this.onSelectTour}
        loading={loading}
        error={error}
        tours={tours}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.tours.loading,
  error: state.tours.error,
  tours: state.tours.data,
});

const mapDispatchToProps = dispatch => bindActionCreators(ToursCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToursContainer);
