// @flow

import React from 'react';
import { TouchableOpacity, FlatList, View } from 'react-native';
import styled from 'styled-components';

import DefaultPlaceListItem from '../../../../common/DefaultPlaceListItem';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const TimeLine = styled(View)`
  width: ${({ theme }) => theme.metrics.extraSmallSize}px;
  height: 100%;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.inactiveTabIcon};
  position: absolute;
`;

const CircularMarker = styled(View)`
  width: ${({ theme }) => theme.metrics.extraLargeSize}px;
  height: ${({ theme }) => theme.metrics.extraLargeSize}px;
  border-radius: ${({ theme }) => theme.metrics.extraLargeSize / 2}px;
  background-color: ${({ theme }) => theme.colors.contrastColor};
`;

const ListItemWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const List = styled(FlatList)`
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
`;

const PlaceItemButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.width - theme.metrics.getWidthFromDP('10%')}px;
`;

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

type Props = {
  onSelectPlace: Function,
  places: Array<Place>,
};

const ToursList = ({ onSelectPlace, places }: Props): Object => (
  <Wrapper>
    <TimeLine />
    <List
      keyExtractor={item => `${item.id}`}
      showsVerticalScrollIndicator={false}
      data={places}
      renderItem={({ item, index }) => (
        <ListItemWrapper>
          <CircularMarker />
          <PlaceItemButton
            onPress={() => onSelectPlace(item.id)}
          >
            <DefaultPlaceListItem
              distanceToUser={item.distanceToUser}
              imageURL={item.images[0]}
              isOpen={item.isOpen}
              name={item.name}
            />
          </PlaceItemButton>
        </ListItemWrapper>
      )}
    />
  </Wrapper>
);

export default ToursList;
