// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import SectionTitle from '../../SectionTitle';
import OpenMapButton from './OpenMapButton';
import Icon from '../../../../Icon';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('90%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const MapContainer = styled(MapView)`
  width: 100%;
  height: 100%;
`;

const AddressWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const AddressText = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: 85%;
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => 1.5 * theme.metrics.mediumSize}px;
  color: ${({ theme }) => theme.colors.subText};
  font-weight: 600;
`;

const location = {
  latitude: -3.8406333,
  longitude: -38.5606571,
};

const ASPECT_RATIO = appStyles.metrics.width / appStyles.metrics.height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Location = (): Object => (
  <Fragment>
    <SectionTitle>Location</SectionTitle>
    <AddressWrapper>
      <Icon
        color={appStyles.colors.contrastColor}
        name="map-marker"
        size={25}
      />
      <AddressText>R. da Saudade 43-15 - Lisboa, Portugal</AddressText>
    </AddressWrapper>
    <Wrapper>
      <MapContainer
        showsMyLocationButton={false}
        zoomControlEnabled={false}
        zoomTapEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
        zoomEnabled={false}
        showsBuildings
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          longitudeDelta: LONGITUDE_DELTA,
          latitudeDelta: LATITUDE_DELTA,
        }}
      >
        <Marker
          coordinate={location}
        >
          <Icon
            color={appStyles.colors.red}
            name="map-marker"
            size={36}
          />
        </Marker>
      </MapContainer>
      <OpenMapButton
        location={location}
        placeName="Bairro"
      />
    </Wrapper>
  </Fragment>
);

export default Location;
