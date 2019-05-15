// @flow

import React, { Fragment, Component } from 'react';
import { View } from 'react-native';

import HomeComponent from './components/HomeComponent';
import CONSTANTS from '../../../utils/CONSTANTS';
import appStyles from '../../../styles';

const PLACES = [
  {
    location: {
      latitude: -3.8406333,
      longitude: -38.5606571,
    },
    isOpen: true,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/coco-bambu-sul.jpeg',
    name: 'Place 01',
    distanceToUser: 4,
    id: '1',
  },
  {
    location: {
      latitude: -3.7273013,
      longitude: -38.5897033,
    },
    isOpen: false,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/misaki.jpeg',
    distanceToUser: 1.1,
    name: 'Place 02',
    id: '2',
  },
  {
    location: {
      latitude: -3.7451878,
      longitude: -38.5736122,
    },
    isOpen: true,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/cabana-riomar.jpeg',
    distanceToUser: 3.7,
    name: 'Place 03',
    id: '3',
  },
  {
    location: {
      latitude: -3.8406333,
      longitude: -38.5606571,
    },
    isOpen: true,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/coco-bambu-sul.jpeg',
    name: 'Place 01',
    distanceToUser: 4,
    id: '12',
  },
  {
    location: {
      latitude: -3.7273013,
      longitude: -38.5897033,
    },
    isOpen: false,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/misaki.jpeg',
    distanceToUser: 1.1,
    name: 'Place 02',
    id: '22',
  },
  {
    location: {
      latitude: -3.7451878,
      longitude: -38.5736122,
    },
    isOpen: true,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/cabana-riomar.jpeg',
    distanceToUser: 3.7,
    name: 'Place 03',
    id: '23',
  },
];

class HomeContainer extends Component {
  _outterListRef: Object = {};

  state = {
    shouldShowDarkLayer: false,
    indexScreenSelected: 0,
    isFilterOpen: false,
    mapHeight: 0,
  };

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      [CONSTANTS.PARAMS.CHANGE_HOME_SCREEN_TYPE]: this.onChooseScreenIndex,
      [CONSTANTS.PARAMS.ON_TOGGLE_DARK_LAYER]: this.onToggleDarkLayer,
      [CONSTANTS.PARAMS.ON_SEARCH_PLACE]: place => console.tron.log(place),
      [CONSTANTS.PARAMS.TOGGLE_FILTER]: this.onToggleFilter,
    });

    this.onPressListItem();
  }

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

    return (
      <View />
      // <HomeComponent
      //   shouldShowDarkLayer={shouldShowDarkLayer}
      //   onSetFlatListRef={this.onSetFlatListRef}
      //   onPressListItem={this.onPressListItem}
      //   onSetMapHeight={this.onSetMapHeight}
      //   onToggleFilter={this.onToggleFilter}
      //   isFilterOpen={isFilterOpen}
      //   mapHeight={mapHeight}
      //   places={PLACES}
      // />
    );
  }
}

export default HomeContainer;
