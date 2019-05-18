// @flow

import React, { Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components';

import Loading from '../../../common/Loading';
import ListScreen from './list/PlacesList';
import MapScreen from './map/PlacesMap';
import Filter from './filter/Filter';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
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

type LatLng = {
  longitude: number,
  latitude: number,
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
  onSearchWithFilter: Function,
  shouldShowDarkLayer: boolean,
  onSetFlatListRef: Function,
  onPressListItem: Function,
  onToggleFilter: Function,
  onSetMapHeight: Function,
  isFilterOpen: boolean,
  places: Array<Place>,
  mapHeight: number,
  loading: boolean,
  error: boolean,
};

const HomeComponent = ({
  onSearchWithFilter,
  shouldShowDarkLayer,
  onSetFlatListRef,
  onPressListItem,
  onToggleFilter,
  onSetMapHeight,
  isFilterOpen,
  mapHeight,
  loading,
  places,
  error,
}: Props): Object => {
  const shouldShowLoading = loading && !error && places.length === 0;
  const shouldShowContent = !loading && !error;

  return (
    <Wrapper>
      {shouldShowLoading && <Loading />}
      {true && (
        <Fragment>
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
            {places.length > 0 && (
              <Fragment>
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
              </Fragment>
            )}
          </ContentWrapper>
          {shouldShowDarkLayer && <DarkLayer />}
          <Filter
            onSearchWithFilter={onSearchWithFilter}
            onToggleFilter={onToggleFilter}
            isVisible={isFilterOpen}
          />
        </Fragment>
      )}
    </Wrapper>
  );
};

export default HomeComponent;
