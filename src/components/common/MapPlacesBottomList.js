// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from '../../utils/isEqualsOrLargestThanIphoneX';
import DefaultPlaceListItemWithCard from './DefaultPlaceListItemWithCard';
import FooterListLoading from './FooterListLoading';
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
  onEndListReached: ?Function,
  isAllDataFetched: ?boolean,
  onPressListItem: Function,
  onSetListRef: ?Function,
  places: Array<Place>,
  withRefetch: boolean,
  loading: ?boolean,
};

const ITEM_LIST_WIDTH = appStyles.metrics.width;

const PlacesBottomList = ({
  onChangePlaceSelected,
  isAllDataFetched,
  onEndListReached,
  onPressListItem,
  onSetListRef,
  withRefetch,
  loading,
  places,
}: Props): Object => (
  <ListWrapper>
    <FlatList
      onMomentumScrollEnd={event => onMomentumScrollEnd(onChangePlaceSelected, event)
      }
      ListFooterComponent={() => {
        if (withRefetch && (!isAllDataFetched || loading)) {
          return (
            <FooterListLoading
              withHorizontalList
              styleProps={{
                height: '100%',
              }}
            />
          );
        }

        return null;
      }}
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
      onEndReached={() => {
        if (withRefetch) {
          onEndListReached();
        }
      }}
      ref={(ref: any): void => {
        onSetListRef && onSetListRef(ref);
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item.id}`}
      onEndReachedThreshold={0.9}
      initialNumToRender={5}
      pagingEnabled
      data={places}
      horizontal
    />
  </ListWrapper>
);

export default PlacesBottomList;
