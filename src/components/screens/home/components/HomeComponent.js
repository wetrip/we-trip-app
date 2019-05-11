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
  flex: 1;
  flex-direction: row;
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
  places: Array<Object>,
};

const HomeComponent = ({
  shouldShowDarkLayer,
  onSetFlatListRef,
  onPressListItem,
  places,
}: Props): Object => (
  <Wrapper>
    <ContentWrapper>
      <MapScreen
        onNavigateToMainStack={this.onNavigateToMainStack}
        onPressListItem={onPressListItem}
        places={places}
      />
    </ContentWrapper>
    {/* <FlatList
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
      nestedScrollEnabled
      data={LAYOUTS}
      pagingEnabled
      horizontal
    /> */}
    {shouldShowDarkLayer && <DarkLayer />}
  </Wrapper>
);

export default HomeComponent;
