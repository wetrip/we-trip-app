// @flow

import React, { PureComponent } from 'react';
import { PixelRatio, Platform, View, Text } from 'react-native';
import styled from 'styled-components';

import MapView, { Marker } from 'react-native-maps';
import Directions from './Directions';

import getUserLocation from '../../../../../services/location/getUserLocation';
import DefaultPlaceListItem from '../../../../common/DefaultPlaceListItem';
import LoadingUserLocation from './LoadingUserLocation';
import CONSTANTS from '../../../../../utils/CONSTANTS';
import PlacesBottomList from './PlacesBottomList';
import appStyles from '../../../../../styles';
import Icon from '../../../../common/Icon';

const Container = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const MapContainer = styled(MapView)`
  width: 100%;
  height: 100%;
`;

type Props = {
  onPressListItem: Function,
  placeLocation: Object,
  places: Array<Object>,
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

  getMapEdgePadding = (): Object => {
    const bottomEdgePaddingValue = appStyles.metrics.getWidthFromDP('16%')
      + appStyles.metrics.getHeightFromDP('16%');

    const edgePadding = {
      top: Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(50) : 50,
      right: Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(50) : 50,
      bottom: Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(bottomEdgePaddingValue) : bottomEdgePaddingValue,
      left: Platform.OS === 'android' ? PixelRatio.getPixelSizeForLayoutSize(50) : 50,
    };

    return edgePadding;
  };

  onFitMapCoordinates = (): void => {
    const { indexPlaceSelected, userLocation } = this.state;
    const { places } = this.props;

    const edgePadding = this.getMapEdgePadding();

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
    } = this.state;
    const { onPressListItem, places } = this.props;

    return (
      <Container>
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
              destination={
                places[indexPlaceSelected]
                && places[indexPlaceSelected].location
              }
            />
          )}
          <Marker
            coordinate={
              places[indexPlaceSelected] && places[indexPlaceSelected].location
            }
          >
            <Icon
              color={appStyles.colors.red}
              name="map-marker"
              size={34}
            />
          </Marker>
        </MapContainer>
        <PlacesBottomList
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
