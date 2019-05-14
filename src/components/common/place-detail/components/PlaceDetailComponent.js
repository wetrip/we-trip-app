// @flow

import React from 'react';
import { ScrollView, Platform, View } from 'react-native';
import styled from 'styled-components';

import ImagesList from './sections/images-list/PlaceImagesList';
import Description from './sections/description/PlaceDescription';
import Transports from './sections/transports/Transports';
import Location from './sections/location/Location';
import Name from './sections/place-name/PlaceName';
import Prices from './sections/prices/Prices';
import appStyles from '../../../../styles';

const ContentWrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const PlaceDetailComponent = (): Object => (
  <ContentWrapper
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingTop: Platform.select({
        android: appStyles.metrics.getHeightFromDP('8%'),
        ios: appStyles.metrics.getHeightFromDP('12%'),
      }),
    }}
  >
    <Name>Stenio Wagner Pereira de Freitas</Name>
    <ImagesList />
    <Description
      description="Alfama é o mais antigo e um dos mais típicos bairros da cidade de Lisboa. Actualmente, abrange uma parte da freguesia de Santa Maria Maior e outra da freguesia de São Vicente."
    />
    <Prices />
    <Location />
    <Transports />
  </ContentWrapper>
);

export default PlaceDetailComponent;
