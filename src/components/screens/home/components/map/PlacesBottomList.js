// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import DefaultPlaceListItemWithCard from '../../../../common/DefaultPlaceListItemWithCard';
import appStyles from '../../../../../styles';

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

type Props = {
  onChangePlaceSelected: Function,
  onPressListItem: Function,
  places: Array<Object>,
};

const PlacesBottomList = ({
  onChangePlaceSelected,
  onPressListItem,
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
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      data={places}
      pagingEnabled
      horizontal
    />
  </ListWrapper>
);

export default PlacesBottomList;
