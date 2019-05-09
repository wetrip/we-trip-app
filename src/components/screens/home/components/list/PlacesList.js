// @flow

import React from 'react';
import { FlatList } from 'react-native';

import PlacesListItem from './PlacesListItem';

type Props = {
  onPressListItem: Function,
  places: Array<Object>,
};

const PlacesList = ({ onPressListItem, places }: Props): Object => (
  <FlatList
    showsVerticalScrollIndicator={false}
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
