// @flow

import React from 'react';
import { ScrollView, Platform, View } from 'react-native';
import styled from 'styled-components';

import OperatingHours from './components/sections/operating-hours/OperatingHours';
import ImagesList from './components/sections/images-list/ImagesList';
import Transports from './components/sections/transports/Transports';
import Location from './components/sections/location/Location';
import Description from './components/sections/Description';
import Categories from './components/sections/Categories';
import Prices from './components/sections/Prices';
import Name from './components/sections/Name';

import CONSTANTS from '../../../utils/CONSTANTS';
import appStyles from '../../../styles';

const ContentWrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

type Props = {
  navigation: Object,
};

const PlaceDetail = ({ navigation }: Props): Object => {
  const {
    operatingHours,
    description,
    categories,
    transports,
    location,
    prices,
    images,
    name,
  } = navigation.state.params[CONSTANTS.PARAMS.PLACE_SELECTED];

  return (
    <ContentWrapper
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: Platform.select({
          android: appStyles.metrics.getHeightFromDP('8%'),
          ios: appStyles.metrics.getHeightFromDP('12%'),
        }),
      }}
    >
      <Name>{name}</Name>
      <ImagesList
        images={images}
      />
      <Categories
        categories={categories}
      />
      <Description
        description={description}
      />
      <OperatingHours
        operatingHours={operatingHours}
      />
      <Prices
        prices={prices}
      />
      <Location
        location={location}
        placeName={name}
      />
      <Transports
        transports={transports}
      />
    </ContentWrapper>
  );
};

export default PlaceDetail;
