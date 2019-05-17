// @flow

import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

import appStyles from '../../styles';

type LatLng = {
  latitude: number,
  longitude: number,
};

type Props = {
  waypoints: ?Array<LatLng>,
  destination: LatLng,
  onReady: Function,
  origin: LatLng,
};

const Directions = ({
  destination, waypoints, origin, onReady,
}: props) => (
  <MapViewDirections
    apikey="AIzaSyB05_IC2w2UDoDEkoenIaBpjLL49Sn7FnQ"
    strokeColor={appStyles.colors.textColor}
    waypoints={waypoints || null}
    destination={destination}
    onReady={onReady}
    origin={origin}
    strokeWidth={3}
  />
);

export default Directions;
