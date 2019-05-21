// @flow

import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';

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
  imageURL: string,
  isOpen: boolean,
  name: string,
  id: number,
};

type PlaceProp = {
  loadingAllPlaces: boolean,
  allPlaces: Array<Place>,
  error: boolean,
};

type Props = {
  places: Array<PlaceProp>,
  getAllPlaces: Function,
  loading: boolean,
};

type LatLng = {
  longitude: number,
  latitude: number,
};

type State = {
  isGettingUserLocation: boolean,
  shouldShowDarkLayer: boolean,
  indexScreenSelected: number,
  placesDataset: Array<Place>,
  isFilterOpen: boolean,
  currentFetchPage: 0,
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
    const { getAllPlaces, navigation } = this.props;
    let userLocation;

    navigation.setParams({
      [CONSTANTS.PARAMS.CHANGE_HOME_SCREEN_TYPE]: this.onChooseScreenIndex,
      [CONSTANTS.PARAMS.ON_TOGGLE_DARK_LAYER]: this.onToggleDarkLayer,
      [CONSTANTS.PARAMS.ON_SEARCH_PLACE]: placeName => this.onSearchByName(placeName),
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
    const { places } = nextProps;
    const { loading, allPlaces } = places;
    const { placesDataset } = this.state;

    if (allPlaces.length === 0) {
      this.setState({
        isAllDataFetched: true,
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

    const hasRepeatedData = checkIsSameData();

    if (loading || hasRepeatedData) {
      return;
    }

    this.setState({
      placesDataset: [...placesDataset, ...allPlaces],
      isAllDataFetched: false,
    });
  }

  onFetchData = (): void => {
    const { currentFetchPage, userLocation, currentFilter } = this.state;

    const { getAllPlaces, places } = this.props;
    const { loading } = places;

    const isEnabledToRefetchData = this.checkIsEnableToRefetchData();

    if (loading || !isEnabledToRefetchData) {
      return;
    }

    this.setState({
      currentFetchPage: currentFetchPage + 1,
    });

    getAllPlaces(userLocation, {
      ...currentFilter,
      _page: currentFetchPage + 1,
      _limit: 5,
    });
  };

  onSearchWithFilter = (filter: Object): void => {
    this.setState(
      {
        currentFilter: filter,
        currentFetchPage: 0,
        isFilterOpen: false,
      },
      () => this.onFetchData(),
    );
  };

  onSearchByName = (placeName: string): void => {
    this.setState(
      {
        currentFilter: { name: placeName },
        currentFetchPage: 0,
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

  onChooseScreenIndex = (index: number): void => {
    const { placesDataset } = this.state;

    if (placesDataset === 0) {
      return;
    }

    this.setState(
      {
        indexScreenSelected: index,
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

  checkIsEnableToRefetchData = (): boolean => {
    const currentTimeStamp = new Date().getTime();
    const timestampDifference = currentTimeStamp - this._lastFetchTimestamp;

    this._lastFetchTimestamp = currentTimeStamp;

    if (timestampDifference < 750) {
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

    const { places } = this.props;
    const { loadingAllPlaces, error } = places;

    return (
      <HomeComponent
        loading={isGettingUserLocation || loadingAllPlaces}
        onSearchWithFilter={this.onSearchWithFilter}
        shouldShowDarkLayer={shouldShowDarkLayer}
        onSetFlatListRef={this.onSetFlatListRef}
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
  places: state.places,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
