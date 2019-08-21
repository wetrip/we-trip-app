// @flow
import Reactotron from 'reactotron-react-native';

import React, { Fragment } from 'react';
import { ScrollView, Platform, View } from 'react-native';
import styled from 'styled-components';

import OperatingHours from './sections/operating-hours/OperatingHours';
import IsPlaceOpenOrClosed from './sections/IsPlaceOpenOrClosed';
import ImagesList from './sections/images-list/ImagesList';
import Transports from './sections/transports/Transports';
import Location from './sections/location/Location';
import Description from './sections/Description';
import Categories from './sections/Categories';
import Prices from './sections/Prices';
import Name from './sections/Name';

import Loading from '../../Loading';
import appStyles from '../../../../styles';

const ContentWrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

type LatLng = {
  longitude: number,
  latitude: number,
};

type OperatingHoursType = {
  dayOfWeek: number,
  closeAt: string,
  openAt: string,
};

type PricesType = {
  priceTypeId: number,
  price: string,
};

type Ticket = {
  isAccessible: boolean,
  stationName: string,
  description: string,
  isNocturne: boolean,
  isDiurnal: boolean,
  id: number,
};

type Transport = {
  transportTypeId: number,
  tickets: Array<Ticket>,
  price: string,
};

type Price = {
  priceTypeId: number,
  price: string,
};

type Category = {
  name: string,
  id: number,
};

type Place = {
  schedules: Array<OperatingHoursType>,
  transports: Array<Transport>,
  categories: Array<Category>,
  images: Array<string>,
  prices: Array<Price>,
  description: string,
  location: LatLng,
  isOpen: boolean,
  name: string,
};

type Props = {
  loading: boolean,
  error: boolean,
  place: Place,
};

const renderContent = (place: Place): Object => {

  const {
    schedules,
    description,
    categories,
    transports,
    location,
    isOpen,
    prices,
    images,
    name,
  } = place;

  Reactotron.log("place", place);

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
      <IsPlaceOpenOrClosed
        isOpen={isOpen}
      />
      <ImagesList
        images={images}
      />
      <Description
        description={description}
      />
      {schedules && schedules.length > 0 && <OperatingHours
        operatingHours={schedules}
      />}
      {prices && prices.length > 0 && <Prices
        prices={prices}
      />}
      <Location
        location={location}
        placeName={name}
      />
      {transports && transports.length > 0 && <Transports
        transports={transports}
      />}
      {categories && categories.length > 0 && <Categories
        categories={categories}
      />}
    </ContentWrapper>
  );
};

const PlaceDetailComponent = ({ loading, error, place }: Props): Object => (
  <Fragment>
    {loading && <Loading />}
    {place && renderContent(place)}
  </Fragment>
);

export default PlaceDetailComponent;
