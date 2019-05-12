// @flow

import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';

import PlacesListItem from './PlacesListItem';

const List = styled(FlatList)`
  width: ${({ theme }) => theme.metrics.width}px;
`;

type Props = {
  onPressListItem: Function,
  places: Array<Object>,
};

const PlacesList = ({ onPressListItem, places }: Props): Object => (
  <List
    keyExtractor={item => `${item.id}`}
    data={places}
    renderItem={({ item, index }) => (
      <PlacesListItem
        {...item}
        onPressListItem={onPressListItem}
      />
    )}
  />
);

export default PlacesList;
