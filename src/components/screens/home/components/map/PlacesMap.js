// @flow

import React, { PureComponent, Fragment } from 'react';
import {
  PixelRatio, Platform, View, Text,
} from 'react-native';
import styled from 'styled-components';

import MapView, { Marker } from 'react-native-maps';
import Directions from '../../../../common/Directions';

import getUserLocation from '../../../../../services/location/getUserLocation';
import { getMapEdgePadding, getInitialRegion } from '../../../../../utils/map';
import DefaultPlaceListItem from '../../../../common/DefaultPlaceListItem';
import MapPlacesBottomList from '../../../../common/MapPlacesBottomList';
import LoadingUserLocation from './LoadingUserLocation';
import CONSTANTS from '../../../../../utils/CONSTANTS';
import appStyles from '../../../../../styles';
import Icon from '../../../../common/Icon';

const Container = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  justify-content: flex-end;
  align-items: flex-end;
`;

const MapContainer = styled(MapView)`
  width: 100%;
  height: ${({ isMapReady, height, theme }) => {
    if (!isMapReady || height === 0) {
      return theme.metrics.height;
    }

    return height;
  }}px;
`;

type LatLng = {
  longitude: number,
  latitude: number,
};

type Props = {
  onPressListItem: Function,
  placeLocation: Object,
  places: Array<Object>,
  userLocation: LatLng,
  mapHeight: number,
};

type State = {
  indexPlaceSelected: number,
  isMapReady: boolean,
};

class PlacesMap extends PureComponent<Props, State> {
  _mapRef: Object = null;

  state = {
    indexPlaceSelected: 0,
    isMapReady: false,
  };

  onFitMapCoordinates = (): void => {
    const { indexPlaceSelected } = this.state;
    const { userLocation, places } = this.props;

    const edgePadding = getMapEdgePadding();

    const markers = userLocation
      ? [userLocation, places[indexPlaceSelected].location]
      : [places[indexPlaceSelected].location];

    this._mapRef.fitToCoordinates(markers, {
      animated: true,
      edgePadding,
    });
  };

  onChangePlaceSelected = (indexSelected: number): void => {
    const { indexPlaceSelected } = this.state;
    const { places } = this.props;

    const isSameIndex = indexPlaceSelected === indexSelected;
    const isIndexOutOfBounds = indexSelected >= places.length || indexSelected < 0;

    if (isIndexOutOfBounds || isSameIndex) {
      return;
    }

    this.setState({
      indexPlaceSelected: indexSelected,
    });
  };

  onMapReady = (): void => {
    const { userLocation, places } = this.props;

    if (!userLocation) {
      this.onFitMapCoordinates();
    }
  };

  render() {
    const { indexPlaceSelected, isMapReady } = this.state;

    const {
      onPressListItem, userLocation, mapHeight, places,
    } = this.props;

    const shouldShowContent = isMapReady && this._mapRef;

    return (
      <Container>
        <MapContainer
          loadingBackgroundColor={appStyles.colors.secondaryColor}
          onLayout={() => this.setState({ isMapReady: true })}
          loadingIndicatorColor={appStyles.colors.textColor}
          initialRegion={getInitialRegion()}
          showsMyLocationButton={false}
          onMapReady={this.onMapReady}
          isMapReady={isMapReady}
          height={mapHeight}
          showsUserLocation
          loadingEnabled
          showsBuildings
          ref={(ref) => {
            this._mapRef = ref;
          }}
        >
          {shouldShowContent && (
            <Fragment>
              {userLocation && (
                <Directions
                  onReady={this.onFitMapCoordinates}
                  origin={userLocation}
                  destination={
                    places[indexPlaceSelected]
                    && places[indexPlaceSelected].location
                  }
                />
              )}
              {places[indexPlaceSelected] && (
                <Marker
                  coordinate={
                    places[indexPlaceSelected]
                    && places[indexPlaceSelected].location
                  }
                >
                  <Icon
                    color={appStyles.colors.red}
                    name="map-marker"
                    size={36}
                  />
                </Marker>
              )}
            </Fragment>
          )}
        </MapContainer>
        {shouldShowContent && (
          <MapPlacesBottomList
            onChangePlaceSelected={this.onChangePlaceSelected}
            onPressListItem={onPressListItem}
            places={places}
          />
        )}
      </Container>
    );
  }
}

export default PlacesMap;
