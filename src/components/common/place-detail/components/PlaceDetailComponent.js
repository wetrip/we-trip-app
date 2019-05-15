// @flow

import React from 'react';
import { ScrollView, Platform, View } from 'react-native';
import styled from 'styled-components';

import OperatingHours from './sections/operating-hours/OperatingHours';
import ImagesList from './sections/images-list/ImagesList';
import Transports from './sections/transports/Transports';
import Location from './sections/location/Location';
import Description from './sections/Description';
import Categories from './sections/Categories';
import Prices from './sections/Prices';
import Name from './sections/Name';

import appStyles from '../../../../styles';

const ContentWrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const CATEGORIES = Array(5)
  .fill({})
  .map((item, index) => ({
    id: `${index}`,
    name: `Category ${index + 1}`,
  }));

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
    <Categories
      categories={CATEGORIES}
    />
    <Description
      description="Alfama é o mais antigo e um dos mais típicos bairros da cidade de Lisboa. Actualmente, abrange uma parte da freguesia de Santa Maria Maior e outra da freguesia de São Vicente."
    />
    <OperatingHours />
    <Prices />
    <Location />
    <Transports />
  </ContentWrapper>
);

export default PlaceDetailComponent;
