// @flow

import React, { Fragment, Component } from 'react';
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
  getAllPlaces: Function,
  places: PlaceProp,
};

type LatLng = {
  longitude: number,
  latitude: number,
};

type State = {
  shouldShowDarkLayer: boolean,
  indexScreenSelected: number,
  isFilterOpen: boolean,
  userLocation: LatLng,
  mapHeight: number,
};

const DEFAULT_FILTER = {
  type: 'top_rated',
  categories: [],
  price: 'all',
};

class HomeContainer extends Component<Props, State> {
  _outterListRef: Object = {};

  state = {
    shouldShowDarkLayer: false,
    filter: DEFAULT_FILTER,
    indexScreenSelected: 0,
    isFilterOpen: false,
    userLocation: null,
    mapHeight: 0,
  };

  async componentDidMount() {
    const { getAllPlaces, navigation } = this.props;
    let userLocation;

    navigation.setParams({
      [CONSTANTS.PARAMS.CHANGE_HOME_SCREEN_TYPE]: this.onChooseScreenIndex,
      [CONSTANTS.PARAMS.ON_TOGGLE_DARK_LAYER]: this.onToggleDarkLayer,
      [CONSTANTS.PARAMS.ON_SEARCH_PLACE]: place => console.tron.log(place),
      [CONSTANTS.PARAMS.TOGGLE_FILTER]: this.onToggleFilter,
    });

    try {
      userLocation = await getUserLocation(navigator);
    } catch {
      userLocation = null;
    }

    this.setState({
      userLocation,
    });

    getAllPlaces(userLocation, {});
  }

  onPressListItem = (id: string): void => {
    const { navigation } = this.props;

    navigation.navigate(CONSTANTS.ROUTES.PLACE_DETAIL, {
      [CONSTANTS.PARAMS.PLACE_ID]: id,
    });
  };

  onSearchWithFilter = (filter: Object): void => {
    const { getAllPlaces } = this.props;
    const { userLocation } = this.state;

    const filterParams = {
      userLocation,
      ...filter,
    };

    this.setState(
      {
        isFilterOpen: false,
      },
      () => getAllPlaces(userLocation, filterParams),
    );
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

  render() {
    const { shouldShowDarkLayer, isFilterOpen, mapHeight } = this.state;

    const { places } = this.props;
    const { loadingAllPlaces, allPlaces, error } = places;

    return (
      <HomeComponent
        onSearchWithFilter={this.onSearchWithFilter}
        shouldShowDarkLayer={shouldShowDarkLayer}
        onSetFlatListRef={this.onSetFlatListRef}
        onPressListItem={this.onPressListItem}
        onSetMapHeight={this.onSetMapHeight}
        onToggleFilter={this.onToggleFilter}
        isFilterOpen={isFilterOpen}
        loading={loadingAllPlaces}
        mapHeight={mapHeight}
        places={allPlaces}
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
