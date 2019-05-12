// @flow

import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';

import ListScreen from './list/PlacesList';
import MapScreen from './map/PlacesMap';

const Wrapper = styled(View)`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentWrapper = styled(ScrollView)`
  flex: 1;
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
  onSetMapHeight: Function,
  places: Array<Object>,
  mapHeight: number,
};

const HomeComponent = ({
  shouldShowDarkLayer,
  onSetFlatListRef,
  onPressListItem,
  onSetMapHeight,
  mapHeight,
  places,
}: Props): Object => (
  <Wrapper>
    <ContentWrapper
      ref={(ref: any): void => onSetFlatListRef(ref)}
      onLayout={({
        nativeEvent: {
          layout: { height },
        },
      }) => {
        if (mapHeight === 0) {
          onSetMapHeight(height);
        }
      }}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      pagingEnabled
      horizontal
    >
      <ListScreen
        onPressListItem={onPressListItem}
        places={places}
      />
      <MapScreen
        onNavigateToMainStack={this.onNavigateToMainStack}
        onPressListItem={onPressListItem}
        mapHeight={mapHeight}
        places={places}
      />
    </ContentWrapper>
    {shouldShowDarkLayer && <DarkLayer />}
  </Wrapper>
);

export default HomeComponent;
