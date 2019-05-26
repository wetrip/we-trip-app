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

type State = {
  isAllDataFetched: boolean,
  currentFetchPage: number,
};

class ToursContainer extends Component<Props, State> {
  _lastFetchTimestamp: number = 0;

  state = {
    isAllDataFetched: false,
    currentFetchPage: 0,
    toursDataset: [],
  };

  componentDidMount() {
    this.onFetchData();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { toursDataset } = this.state;
    const { tours } = nextProps;

    this.setState({
      isAllDataFetched:
        tours.length < CONSTANTS.VALUES.LIMIT_ITEMS_RECEIVED_PER_REQUEST,
      toursDataset: [...toursDataset, ...tours],
    });
  }

  onFetchData = (): void => {
    const { getTours, loading } = this.props;
    const { currentFetchPage } = this.state;

    const isEnabledToRefetchData = this.checkIsEnableToRefetchData();

    if (loading || !isEnabledToRefetchData) {
      return;
    }

    this.setState({
      currentFetchPage: currentFetchPage + 1,
    });

    getTours({
      _page: currentFetchPage + 1,
    });
  };

  onSelectTour = (tour: Tour): void => {
    const { navigation, localRoutes } = this.props;

    navigation.navigate(localRoutes.TOUR_DETAIL, {
      [CONSTANTS.PARAMS.TOUR_SELECTED]: tour,
    });
  };

  checkIsEnableToRefetchData = (): boolean => {
    const currentTimeStamp = new Date().getTime();
    const timestampDifference = currentTimeStamp - this._lastFetchTimestamp;

    this._lastFetchTimestamp = currentTimeStamp;

    if (timestampDifference < 2000) {
      return false;
    }

    return true;
  };

  render() {
    const { isAllDataFetched, toursDataset } = this.state;
    const { loading, error } = this.props;

    return (
      <ToursComponent
        isAllDataFetched={isAllDataFetched}
        onSelectTour={this.onSelectTour}
        onFetchData={this.onFetchData}
        tours={toursDataset}
        loading={loading}
        error={error}
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
