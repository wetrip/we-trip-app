// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import MapView, { Marker } from 'react-native-maps';

import { getMapEdgePadding, getInitialRegion } from '../../../../../utils/map';
import MapPlacesBottomList from '../../../../common/MapPlacesBottomList';
import Directions from '../../../../common/Directions';
import appStyles from '../../../../../styles';
import Icon from '../../../../common/Icon';

const Container = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  justify-content: flex-end;
  align-items: flex-end;
`;

const MapContainer = styled(MapView)`
  width: 100%;
  height: 100%;
`;

type LatLng = {
  latitude: number,
  longitude: number,
};

type Place = {
  distanceToUser: number,
  images: Array<string>,
  location: LatLng,
  isOpen: boolean,
  name: string,
  id: number,
};

type Props = {
  onSwipeMapPlacesList: Function,
  onSetMapPlacesListRef: Function,
  indexMapMarkerSelected: number,
  onFitMapCoordinates: Function,
  onPressMapMarker: Function,
  onSelectPlace: Function,
  onSetMapRef: Function,
  places: Array<Place>,
};

const ToursMap = ({
  indexMapMarkerSelected,
  onSwipeMapPlacesList,
  onSetMapPlacesListRef,
  onFitMapCoordinates,
  onPressMapMarker,
  onSelectPlace,
  onSetMapRef,
  places,
}: Props): Object => {
  const destination = places[places.length - 1].location;
  const origin = places[0].location;

  const waypoints = places
    .slice(1, places.length - 1)
    .map(place => place.location);

  return (
    <Container>
      <MapContainer
        ref={(ref: Object): void => onSetMapRef(ref)}
        initialRegion={getInitialRegion()}
      >
        <Directions
          onReady={onFitMapCoordinates}
          destination={destination}
          waypoints={waypoints}
          origin={origin}
        />
        {places.map((place, index) => (
          <Marker
            onPress={() => onPressMapMarker(index)}
            coordinate={place.location}
            key={place.id}
          >
            <Icon
              color={
                indexMapMarkerSelected === index
                  ? appStyles.colors.red
                  : appStyles.colors.inactiveMarker
              }
              name="map-marker"
              size={36}
            />
          </Marker>
        ))}
      </MapContainer>
      <MapPlacesBottomList
        onSetListRef={(ref: Object): void => onSetMapPlacesListRef(ref)}
        onChangePlaceSelected={onSwipeMapPlacesList}
        onPressListItem={onSelectPlace}
        places={places}
      />
    </Container>
  );
};

export default ToursMap;
