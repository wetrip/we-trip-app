// @flow

import React, { PureComponent, Fragment } from 'react';
import { Platform, View, Text } from 'react-native';
import styled from 'styled-components';

import MapView, { Marker } from 'react-native-maps';
import Directions from './Directions';

import getUserLocation from '../../../../../services/location/getUserLocation';
import DefaultPlaceListItem from '../../../../common/DefaultPlaceListItem';
import LoadingUserLocation from './LoadingUserLocation';
import CONSTANTS from '../../../../../utils/CONSTANTS';
import appStyles from '../../../../../styles';
import Icon from '../../../../common/Icon';

const MapContainer = styled(MapView)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const PLACES = [
  {
    latitude: -3.8406333,
    longitude: -38.5606571,
  },
  {
    latitude: -3.7273013,
    longitude: -38.5897033,
  },
  {
    latitude: -3.7451878,
    longitude: -38.5736122,
  },
];

type Props = {
  placeLocation: Object,
};

type State = {
  isGettingUserLocation: boolean,
  userLocation: Object,
};

class PlacesMap extends PureComponent<Props, State> {
  _mapRef: Object = null;

  state = {
    isGettingUserLocation: true,
    userLocation: null,
  };

  async componentDidMount() {
    try {
      const location = await getUserLocation(navigator);

      if (!location) {
        return;
      }

      const { latitude, longitude } = location;

      this.setState({
        userLocation: {
          longitude,
          latitude,
        },
      });
    } catch (err) {
      alert('There was an error while trying to get your position.');
    } finally {
      this.onFitMapCoordinates();

      this.setState({
        isGettingUserLocation: false,
      });
    }
  }

  getInitialRegion = (): Object => ({
    latitude: CONSTANTS.VALUES.INITIAL_MAP_REGION.latitude,
    longitude: CONSTANTS.VALUES.INITIAL_MAP_REGION.longitude,
    longitudeDelta: CONSTANTS.VALUES.LONGITUDE_DELTA,
    latitudeDelta: CONSTANTS.VALUES.LATITUDE_DELTA,
  });

  onFitMapCoordinates = (): void => {
    const { userLocation } = this.state;

    const markers = userLocation ? [userLocation, PLACES[0]] : [PLACES[0]];

    this._mapRef.fitToCoordinates(markers, {
      animated: true,
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  };

  render() {
    const { isGettingUserLocation, userLocation } = this.state;

    return (
      <Fragment>
        <MapContainer
          ref={(ref) => {
            this._mapRef = ref;
          }}
          initialRegion={this.getInitialRegion()}
          showsMyLocationButton={false}
          showsUserLocation
        >
          {userLocation && (
            <Directions
              onReady={this.onFitMapCoordinates}
              origin={userLocation}
              destination={PLACES[0]}
            />
          )}
          <Marker
            coordinate={PLACES[0]}
          >
            <Icon
              color={appStyles.colors.red}
              name="map-marker"
              size={34}
            />
          </Marker>
        </MapContainer>
        {isGettingUserLocation && <LoadingUserLocation />}
      </Fragment>
    );
  }
}

export default PlacesMap;
