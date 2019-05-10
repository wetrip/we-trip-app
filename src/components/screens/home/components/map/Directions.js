// @flow

import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

import appStyles from '../../../../../styles';

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    apikey="AIzaSyB05_IC2w2UDoDEkoenIaBpjLL49Sn7FnQ"
    strokeColor={appStyles.colors.textColor}
    destination={destination}
    onReady={onReady}
    origin={origin}
    strokeWidth={3}
  />
);

export default Directions;
