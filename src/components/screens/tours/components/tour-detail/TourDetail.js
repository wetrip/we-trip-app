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

const Wrapper = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ListWrapper = styled(ScrollView)`
  flex: 1;
`;

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
  navigation: Object,
};

type State = {
  indexMapMarkerSelected: number,
  indexScreenSelected: number,
};

class TourDetail extends Component {
  _mapPlacesListRef: Object = null;
  _containerLisRef: Object = null;
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
    const { destinations } = this.getTourFromProps();

    const isSameIndex = indexMapMarkerSelected === indexSelected;
    const indexOutOfBounds = indexSelected > destinations.length - 1;

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
    const { destinations } = this.getTourFromProps();
    const edgePadding = getMapEdgePadding();

    const markers = indexMapMarkerSelected < destinations.length - 1
      ? [
        destinations[indexMapMarkerSelected].location,
        destinations[indexMapMarkerSelected + 1].location,
      ]
      : [destinations[indexMapMarkerSelected].location];

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

  getTourFromProps = (): Tour => {
    const { navigation } = this.props;
    const { params } = navigation.state;

    return params[CONSTANTS.PARAMS.TOUR_SELECTED];
  };

  render() {
    const { indexMapMarkerSelected, indexScreenSelected } = this.state;

    const tour = this.getTourFromProps();

    const headerSubtitle = indexScreenSelected === 0
      ? `${indexMapMarkerSelected + 1} of ${
        tour.destinations.length
      } Destinations`
      : `${tour.destinations.length} Destinations`;

    return (
      <Fragment>
        <Header
          subTitle={headerSubtitle}
          title={tour.title}
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
              places={tour.destinations}
            />
            <TourList
              onSelectPlace={this.onSelectPlace}
              places={tour.destinations}
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
