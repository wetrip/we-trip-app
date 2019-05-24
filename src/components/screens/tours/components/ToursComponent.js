// @flow

import React, { Fragment } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

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
  onSelectTour: Function,
  tours: Array<Tour>,
  loading: boolean,
  error: boolean,
};

const renderList = (onSelectTour: Function, tours: Array<Tour>): Object => (
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
    snapToOffsets={getSnapToOffsets(tours.length)}
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    snapToInterval={ITEM_LIST_WIDTH}
    decelerationRate="fast"
    data={tours}
    horizontal
  />
);

const ToursComponent = ({
  onSelectTour,
  loading,
  error,
  tours,
}: Props): Object => (
  <Wrapper>
    {loading && <Loading />}
    {tours.length > 0 && renderList(onSelectTour, tours)}
  </Wrapper>
);

export default ToursComponent;
