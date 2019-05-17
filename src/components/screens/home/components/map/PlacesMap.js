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

type Props = {
  onPressListItem: Function,
  placeLocation: Object,
  places: Array<Object>,
  mapHeight: number,
};

type State = {
  isGettingUserLocation: boolean,
  userLocation: Object,
};

class PlacesMap extends PureComponent<Props, State> {
  _mapRef: Object = null;

  state = {
    isGettingUserLocation: true,
    indexPlaceSelected: 0,
    userLocation: null,
    isMapReady: false,
  };

  async componentDidMount() {
    try {
      const location = await getUserLocation(navigator);

      if (!location) {
        return;
      }

      const { latitude, longitude } = location;

      this.setState({
        isGettingUserLocation: false,
        userLocation: {
          longitude,
          latitude,
        },
      });
    } catch (err) {
      alert('There was an error while trying to get your position.');

      this.setState({
        isGettingUserLocation: false,
      });
    }
  }

  onFitMapCoordinates = (): void => {
    const { indexPlaceSelected, userLocation } = this.state;
    const { places } = this.props;

    const edgePadding = getMapEdgePadding();

    if (userLocation && places.length === 0) {
      this._mapRef.fitToCoordinates([userLocation], {
        animated: true,
        edgePadding,
      });

      return;
    }

    const markers = userLocation
      ? [userLocation, places[indexPlaceSelected].location]
      : [places[indexPlaceSelected].location];

    this._mapRef.fitToCoordinates(markers, {
      animated: true,
      edgePadding,
    });
  };

  onChangePlaceSelected = (indexPlaceSelected: number): void => {
    this.setState({
      indexPlaceSelected,
    });
  };

  render() {
    const {
      isGettingUserLocation,
      indexPlaceSelected,
      userLocation,
      isMapReady,
    } = this.state;

    const { onPressListItem, mapHeight, places } = this.props;

    return (
      <Container>
        <MapContainer
          onLayout={() => this.setState({ isMapReady: true })}
          isGettingUserLocation={isGettingUserLocation}
          initialRegion={getInitialRegion()}
          showsMyLocationButton={false}
          isMapReady={isMapReady}
          height={mapHeight}
          showsUserLocation
          showsBuildings
          ref={(ref) => {
            this._mapRef = ref;
          }}
        >
        {(isMapReady && this._mapRef) && (
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
          </Fragment>
        )}
        </MapContainer>
        <MapPlacesBottomList
          onChangePlaceSelected={this.onChangePlaceSelected}
          onPressListItem={onPressListItem}
          places={places}
        />
        {isGettingUserLocation && <LoadingUserLocation />}
      </Container>
    );
  }
}

export default PlacesMap;
