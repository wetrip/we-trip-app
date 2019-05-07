// @flow

import React from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import ListScreen from './List';
import MapScreen from './Map';

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
  { Layout: ListScreen, id: 'list' },
  { Layout: MapScreen, id: 'map' },
];

type Props = {
  shouldShowDarkLayer: boolean,
  onSetFlatListRef: Function,
};

const HomeComponent = ({
  shouldShowDarkLayer,
  onSetFlatListRef,
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
            />
          </ContentWrapper>
        );
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
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
