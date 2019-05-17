// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from '../../utils/isEqualsOrLargestThanIphoneX';
import DefaultPlaceListItemWithCard from './DefaultPlaceListItemWithCard';
import appStyles from '../../styles';

const ListWrapper = styled(View)`
  flex: 1;
  position: absolute;
`;

const onMomentumScrollEnd = (
  onChangePlaceSelected: Function,
  event: Object,
): void => {
  const { contentOffset } = event.nativeEvent;

  const isHorizontalSwipeMovement = contentOffset.x > 0;
  const indexItemSelected = isHorizontalSwipeMovement
    ? Math.ceil(contentOffset.x / appStyles.metrics.width)
    : 0;

  onChangePlaceSelected(indexItemSelected);
};

type LatLng = {
  latitude: number,
  longitude: number,
};

type Place = {
  distanceToUser: number,
  location: LatLng,
  imageURL: string,
  isOpen: boolean,
  name: string,
  id: number,
};

type Props = {
  onChangePlaceSelected: Function,
  onPressListItem: Function,
  onSetListRef: ?Function,
  places: Array<Place>,
};

const ITEM_LIST_WIDTH = appStyles.metrics.width;

const PlacesBottomList = ({
  onChangePlaceSelected,
  onPressListItem,
  onSetListRef,
  places,
}: Props): Object => (
  <ListWrapper>
    <FlatList
      onMomentumScrollEnd={event => onMomentumScrollEnd(onChangePlaceSelected, event)
      }
      renderItem={({ item }) => (
        <DefaultPlaceListItemWithCard
          onPressListItem={() => onPressListItem(item.id)}
          distanceToUser={item.distanceToUser}
          imageURL={item.imageURL}
          isOpen={item.isOpen}
          name={item.name}
        />
      )}
      getItemLayout={(data, index) => ({
        length: ITEM_LIST_WIDTH,
        offset: ITEM_LIST_WIDTH * index,
        index,
      })}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item.id}`}
      ref={(ref: any): void => {
        onSetListRef && onSetListRef(ref);
      }}
      data={places}
      pagingEnabled
      horizontal
    />
  </ListWrapper>
);

export default PlacesBottomList;
