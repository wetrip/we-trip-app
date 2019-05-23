// @flow

import React, { Fragment, PureComponent } from 'react';
import { Keyboard } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaceCreators } from '../../../store/ducks/places';

import getUserLocation from '../../../services/location/getUserLocation';
import HomeComponent from './components/HomeComponent';
import CONSTANTS from '../../../utils/CONSTANTS';
import appStyles from '../../../styles';

type Place = {
  distanceToUser: number,
  location: LatLng,
  isOpen: boolean,
  image: string,
  name: string,
  id: number,
};

type Props = {
  places: Array<Place>,
  getPlaces: Function,
  navigation: Object,
  loading: boolean,
  error: boolean,
};

type State = {
  isGettingUserLocation: boolean,
  shouldShowDarkLayer: boolean,
  indexScreenSelected: number,
  placesDataset: Array<Place>,
  isAllDataFetched: boolean,
  currentFetchPage: number,
  currentFilter: Object,
  isFilterOpen: boolean,
  userLocation: LatLng,
  mapHeight: number,
};

class HomeContainer extends PureComponent<Props, State> {
  _lastFetchTimestamp: number = 0;
  _outterListRef: Object = {};

  state = {
    isGettingUserLocation: true,
    shouldShowDarkLayer: false,
    isAllDataFetched: false,
    indexScreenSelected: 0,
    isFilterOpen: false,
    currentFetchPage: 0,
    userLocation: null,
    placesDataset: [],
    currentFilter: {},
    mapHeight: 0,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    let userLocation;

    navigation.setParams({
      [CONSTANTS.PARAMS.CHANGE_HOME_SCREEN_TYPE]: this.onChooseScreenIndex,
      [CONSTANTS.PARAMS.ON_TOGGLE_DARK_LAYER]: this.onToggleDarkLayer,
      [CONSTANTS.PARAMS.ON_SEARCH_PLACE]: this.onSearchByName,
      [CONSTANTS.PARAMS.TOGGLE_FILTER]: this.onToggleFilter,
    });

    /* try {
      userLocation = await getUserLocation(navigator);
    } catch {
      userLocation = null;
    } */

    this.setState(
      {
        isGettingUserLocation: false,
        userLocation: null,
      },
      () => this.onFetchData(),
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    const { navigation, loading, places } = nextProps;
    const { placesDataset } = this.state;
    const { params } = navigation.state;

    if (params[CONSTANTS.PARAMS.SHOULD_RESET_SEARCH_INPUT]) {
      navigation.setParams({
        [CONSTANTS.PARAMS.SHOULD_RESET_SEARCH_INPUT]: false,
      });

      return;
    }

    const checkIsSameData = (): boolean => {
      let isDataRepeated;

      for (let i = 0; i < places.length; i++) {
        isDataRepeated = placesDataset.includes(places[i]);

        if (isDataRepeated) {
          return true;
        }
      }

      return false;
    };

    const isSameData = checkIsSameData();

    if (loading || isSameData) {
      return;
    }

    this.setState({
      isAllDataFetched:
        places.length < CONSTANTS.VALUES.LIMIT_ITEMS_RECEIVED_PER_REQUEST,
      placesDataset: [...placesDataset, ...places],
    });
  }

  onFetchData = (): void => {
    const { currentFetchPage, userLocation, currentFilter } = this.state;
    const { getPlaces, loading } = this.props;

    const isEnabledToRefetchData = this.checkIsEnableToRefetchData();

    if (loading || !isEnabledToRefetchData) {
      return;
    }

    this.setState({
      currentFetchPage: currentFetchPage + 1,
    });

    getPlaces(userLocation, {
      ...currentFilter,
      _limit: CONSTANTS.VALUES.LIMIT_ITEMS_RECEIVED_PER_REQUEST,
      _page: currentFetchPage + 1,
    });
  };

  onSearchWithFilter = (filter: Object): void => {
    const { navigation } = this.props;

    navigation.setParams({
      [CONSTANTS.PARAMS.SHOULD_RESET_SEARCH_INPUT]: true,
    });

    this.setState(
      {
        currentFilter: filter,
        currentFetchPage: 0,
        isFilterOpen: false,
        placesDataset: [],
      },
      () => this.onFetchData(),
    );
  };

  onSearchByName = (placeName: string): void => {
    this.setState(
      {
        currentFilter: { name: placeName },
        currentFetchPage: 0,
        placesDataset: [],
      },
      () => this.onFetchData(),
    );
  };

  onRefreshData = (): void => {
    this.setState(
      {
        currentFetchPage: 0,
        placesDataset: [],
      },
      () => this.onFetchData(),
    );
  };

  onPressListItem = (id: string): void => {
    const { navigation } = this.props;

    navigation.navigate(CONSTANTS.ROUTES.PLACE_DETAIL, {
      [CONSTANTS.PARAMS.PLACE_ID]: id,
    });
  };

  onToggleDarkLayer = (shouldShowDarkLayer: boolean): void => {
    this.setState({
      shouldShowDarkLayer,
    });
  };

  onToggleFilter = (): void => {
    const { isFilterOpen } = this.state;

    this.setState({
      isFilterOpen: !isFilterOpen,
    });
  };

  onChooseScreenIndex = (indexScreenSelected: number): void => {
    this.setState(
      {
        indexScreenSelected,
      },
      () => {
        this._outterListRef.scrollTo({
          x: this.state.indexScreenSelected * appStyles.metrics.width,
          y: 0,
          animated: true,
        });
      },
    );
  };

  onSetFlatListRef = (ref: Object): void => {
    this._outterListRef = ref;
  };

  onSetMapHeight = (mapHeight: number): void => {
    this.setState({
      mapHeight,
    });
  };

  onPressDarkLayer = (): void => {
    this.setState({
      shouldShowDarkLayer: false,
    });

    Keyboard.dismiss();
  };

  checkIsEnableToRefetchData = (): boolean => {
    const currentTimeStamp = new Date().getTime();
    const timestampDifference = currentTimeStamp - this._lastFetchTimestamp;

    this._lastFetchTimestamp = currentTimeStamp;

    if (timestampDifference < 500) {
      return false;
    }

    return true;
  };

  render() {
    const {
      isGettingUserLocation,
      shouldShowDarkLayer,
      isAllDataFetched,
      placesDataset,
      isFilterOpen,
      userLocation,
      mapHeight,
    } = this.state;

    const { places, loading, error } = this.props;

    return (
      <HomeComponent
        onSearchWithFilter={this.onSearchWithFilter}
        loading={isGettingUserLocation || loading}
        shouldShowDarkLayer={shouldShowDarkLayer}
        onSetFlatListRef={this.onSetFlatListRef}
        onPressDarkLayer={this.onPressDarkLayer}
        onPressListItem={this.onPressListItem}
        onSetMapHeight={this.onSetMapHeight}
        onToggleFilter={this.onToggleFilter}
        isAllDataFetched={isAllDataFetched}
        onRefreshData={this.onRefreshData}
        onFetchData={this.onFetchData}
        isFilterOpen={isFilterOpen}
        userLocation={userLocation}
        places={placesDataset}
        mapHeight={mapHeight}
        error={error}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PlaceCreators, dispatch);

const mapStateToProps = state => ({
  loading: state.places.loading,
  places: state.places.data,
  error: state.places.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
