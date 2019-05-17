// @flow

import React, { Component, Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';

import { getMapEdgePadding, getInitialRegion } from '../../../../../utils/map';
import CONSTANTS from '../../../../../utils/CONSTANTS';
import appStyles from '../../../../../styles';
import ScreenSwitcher from './ScreenSwitcher';
import TourList from './ToursList';
import TourMap from './ToursMap';
import Header from './Header';

const PLACES = [
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
    id: 2,
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
    id: 3,
  },
  {
    location: {
      latitude: -3.8406333,
      longitude: -38.5606571,
    },
    isOpen: true,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/coco-bambu-sul.jpeg',
    name: 'Stenio Wagner Pereira de Freitas Stenio Wagner Pereira de Freitas',
    distanceToUser: 4,
    id: 1,
  },
];

const Wrapper = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ListWrapper = styled(ScrollView)`
  flex: 1;
`;

class TourDetail extends Component {
  _containerLisRef: Object = null;
  _mapPlacesListRef: Object = null;
  _mapRef: Object = null;

  state = {
    indexMapMarkerSelected: 0,
    indexScreenSelected: 0,
  };

  onChooseScreenIndex = (indexScreenSelected: number): void => {
    this.setState(
      {
        indexScreenSelected,
      },
      () => {
        this._containerLisRef.scrollTo({
          x: this.state.indexScreenSelected * appStyles.metrics.width,
          y: 0,
          animated: true,
        });
      },
    );
  };

  onSelectPlace = (placeId: number): void => {
    const { navigation } = this.props;

    navigation.navigate(CONSTANTS.ROUTES.PLACE_DETAIL, {
      [CONSTANTS.PARAMS.PLACE_ID]: placeId,
    });
  };

  onSwipeMapPlacesList = (indexSelected: number): void => {
    const { indexMapMarkerSelected } = this.state;
    
    const isSameIndex = indexMapMarkerSelected === indexSelected;
    const indexOutOfBounds = indexSelected > PLACES.length - 1;
    
    if (isSameIndex || indexOutOfBounds) {
      return;
    }

    this.setState({
      indexMapMarkerSelected: indexSelected,
    });

    this.onFitMapCoordinates(indexSelected);
  };

  onPressMapMarker = (indexMapMarker: number): void => {
    const { indexMapMarkerSelected } = this.state;

    const isSameIndex = indexMapMarkerSelected === indexMapMarker;

    if (isSameIndex) {
      return;
    }

    this.setState(
      {
        indexMapMarkerSelected: indexMapMarker,
      },
      () => {
        this._mapPlacesListRef.scrollToIndex({
          index: indexMapMarker,
          animated: true,
        });

        this.onFitMapCoordinates(indexMapMarker);
      },
    );
  };

  onFitMapCoordinates = (indexMapMarkerSelected: number): void => {
    const places = PLACES;

    const edgePadding = getMapEdgePadding();

    const markers = indexMapMarkerSelected < places.length - 1
      ? [
        places[indexMapMarkerSelected].location,
        places[indexMapMarkerSelected + 1].location,
      ]
      : [places[indexMapMarkerSelected].location];

    this._mapRef.fitToCoordinates(markers, {
      animated: true,
      edgePadding,
    });
  };

  onSetMapRef = (ref: Object): void => {
    this._mapRef = ref;
  };

  onSetMapPlacesListRef = (ref: Object): void => {
    this._mapPlacesListRef = ref;
  };

  render() {
    const {
      indexMapMarkerSelected,
      isMarkerPressed,
      indexScreenSelected,
    } = this.state;

    const headerSubtitle = indexScreenSelected === 0
      ? `${indexMapMarkerSelected + 1} of ${PLACES.length} Destinations`
      : `${PLACES.length} Destinations`;

    return (
      <Fragment>
        <Header
          subTitle={headerSubtitle}
          title="Knowing the coast"
        />
        <Wrapper>
          <ListWrapper
            ref={(ref: any): void => {
              this._containerLisRef = ref;
            }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            pagingEnabled
            horizontal
          >
            <TourMap
              onFitMapCoordinates={() => this.onFitMapCoordinates(0)}
              onSetMapPlacesListRef={this.onSetMapPlacesListRef}
              onSwipeMapPlacesList={this.onSwipeMapPlacesList}
              indexMapMarkerSelected={indexMapMarkerSelected}
              onPressMapMarker={this.onPressMapMarker}
              onSelectPlace={this.onSelectPlace}
              onSetMapRef={this.onSetMapRef}
              places={PLACES}
            />
            <TourList
              onSelectPlace={this.onSelectPlace}
              places={PLACES}
            />
          </ListWrapper>
          <ScreenSwitcher
            onChooseScreenIndex={this.onChooseScreenIndex}
            indexScreenSelected={indexScreenSelected}
          />
        </Wrapper>
      </Fragment>
    );
  }
}

export default TourDetail;
