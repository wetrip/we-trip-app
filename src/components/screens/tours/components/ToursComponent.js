// @flow

import React, { Fragment } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import FooterListLoading from '../../../common/FooterListLoading';
import Loading from '../../../common/Loading';
import ToursListItem from './ToursListItem';
import appStyles from '../../../../styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const ITEM_LIST_WIDTH = appStyles.metrics.getWidthFromDP('84%');

const getSnapToOffsets = (numberOfTours): Array<Number> => Array(numberOfTours)
  .fill(ITEM_LIST_WIDTH)
  .map((item, index) => item * index);

type ListProps = {
  isAllDataFetched: boolean,
  onFetchData: Function,
  tours: Array<Tour>,
  loading: boolean,
};

const renderList = ({
  isAllDataFetched,
  onFetchData,
  loading,
  tours,
}: ListProps): Object => (
  <FlatList
    renderItem={({ item, index }) => (
      <ToursListItem
        onPressStartButton={() => onSelectTour(item)}
        numberOfDestinatios={item.destinations.length}
        description={item.description}
        datasetLength={tours.length}
        imageURL={item.image}
        title={item.title}
        index={index}
      />
    )}
    ListFooterComponent={() => (!isAllDataFetched || loading) && (
    <FooterListLoading
      withHorizontalList={false}
      styleProps={{
        paddingRight: appStyles.metrics.extraLargeSize,
        height: '100%',
      }}
    />
    )
    }
    onEndReachedThreshold={0.5}
    initialNumToRender={5}
    onEndReached={() => {
      if (tours.length > 0 && !isAllDataFetched) {
        onFetchData();
      }
    }}
    snapToOffsets={getSnapToOffsets(tours.length)}
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    snapToInterval={ITEM_LIST_WIDTH}
    decelerationRate="fast"
    data={tours}
    horizontal
  />
);

type LatLng = {
  longitude: number,
  latitude: number,
};

type Place = {
  distanceToUser: number,
  images: Array<string>,
  location: LatLng,
  isOpen: boolean,
  name: string,
  id: number,
};

type Tour = {
  destinations: Array<Place>,
  description: string,
  image: string,
  title: string,
  id: number,
};

type Props = {
  isAllDataFetched: boolean,
  onSelectTour: Function,
  onFetchData: Function,
  tours: Array<Tour>,
  loading: boolean,
  error: boolean,
};

const ToursComponent = ({
  isAllDataFetched,
  onSelectTour,
  onFetchData,
  loading,
  error,
  tours,
}: Props): Object => (
  <Wrapper>
    {tours.length === 0 && loading && <Loading />}
    {tours.length > 0
      && renderList({
        isAllDataFetched,
        onFetchData,
        loading,
        tours,
      })}
  </Wrapper>
);

export default ToursComponent;
