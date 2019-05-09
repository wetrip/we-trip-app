// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import ListScreen from './list/PlacesList';
import MapScreen from './map/PlacesMap';

const Wrapper = styled(View)`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: 100%;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const LAYOUTS = [
  { Layout: MapScreen, id: 'map' },
  { Layout: ListScreen, id: 'list' },
];

type Props = {
  shouldShowDarkLayer: boolean,
  onSetFlatListRef: Function,
  onPressListItem: Function,
};

const PLACES = Array(12)
  .fill({
    name: '',
    url:
      'https://s3-sa-east-1.amazonaws.com/mind-cast/images/authors/alan-turing/profile.jpg',
  })
  .map((place, index) => ({ ...place, name: `PLACE ${index + 1}`, id: index }));

const HomeComponent = ({
  shouldShowDarkLayer,
  onSetFlatListRef,
  onPressListItem,
}: Props): Object => (
  <Wrapper>
    <FlatList
      renderItem={({ item }) => {
        const { Layout } = item;

        return (
          <ContentWrapper>
            <Layout
              onNavigateToMainStack={this.onNavigateToMainStack}
              onChangeListIndex={this.onChangeListIndex}
              onPressListItem={onPressListItem}
              places={PLACES}
            />
          </ContentWrapper>
        );
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item.id}`}
      ref={(ref: any): void => onSetFlatListRef(ref)}
      scrollEnabled={false}
      data={LAYOUTS}
      pagingEnabled
      horizontal
    />
    {shouldShowDarkLayer && <DarkLayer />}
  </Wrapper>
);

export default HomeComponent;
