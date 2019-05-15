// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import ToursListItem from './ToursListItem';
import appStyles from '../../../../styles';

const List = styled(FlatList)`
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
  location: LatLng,
  imageURL: string,
  isOpen: boolean,
  name: string,
  id: number,
};

type Tour = {
  destinations: Place,
  description: string,
  imageURL: string,
  title: string,
  id: number,
};

type Props = {
  onSelectTour: Function,
  tours: Array<Tours>,
};

const TestComponent = ({ onSelectTour, tours }: Props): Object => (
  <List
    renderItem={({ item, index }) => (
      <ToursListItem
        onPressStartButton={() => onSelectTour(item.id)}
        numberOfDestinatios={item.destinations.length}
        description={item.description}
        datasetLength={tours.length}
        imageURL={item.imageURL}
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

export default TestComponent;
