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

const MarkerWrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CalloutWrapper = styled(View)`
  flex: 1;
`;

const AddressText = styled(Text)`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ASPECT_RATIO = appStyles.metrics.width / appStyles.metrics.height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let _markerRef: Object = null;

type LocationProps = {
  longitude: number,
  latitude: number,
  address: string,
};

type Props = {
  location: LocationProps,
  placeName: string,
};

const Location = ({ placeName, location }: Props): Object => (
  <Fragment>
    <SectionTitle>Location</SectionTitle>
    <Wrapper>
      <MapContainer
        onRegionChangeComplete={() => _markerRef.showCallout()}
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
          ref={(ref) => {
            _markerRef = ref;
          }}
        >
          <MarkerWrapper>
            <Icon
              color={appStyles.colors.red}
              name="map-marker"
              size={36}
            />
          </MarkerWrapper>
          <Callout
            style={{ flex: 1, position: 'relative' }}
          >
            <CalloutWrapper>
              <AddressText>{location.address}</AddressText>
            </CalloutWrapper>
          </Callout>
        </Marker>
      </MapContainer>
      <OpenMapButton
        placeName={placeName}
        location={location}
      />
    </Wrapper>
  </Fragment>
);

export default Location;
