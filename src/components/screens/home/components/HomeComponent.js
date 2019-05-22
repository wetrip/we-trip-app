// @flow

import React, { Fragment } from 'react';
import { TouchableWithoutFeedback, ScrollView, View } from 'react-native';
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
  isAllDataFetched: boolean,
  onSearchWithFilter: Function,
  shouldShowDarkLayer: boolean,
  onPressDarkLayer: Function,
  onSetFlatListRef: Function,
  onPressListItem: Function,
  onToggleFilter: Function,
  onSetMapHeight: Function,
  onRefreshData: Function,
  onFetchData: Function,
  isFilterOpen: boolean,
  userLocation: ?LatLng,
  places: Array<Place>,
  parentState: Object,
  mapHeight: number,
  loading: boolean,
  error: boolean,
};

const HomeComponent = ({
  shouldShowDarkLayer,
  onSearchWithFilter,
  isAllDataFetched,
  onPressDarkLayer,
  onSetFlatListRef,
  onPressListItem,
  onToggleFilter,
  onSetMapHeight,
  onRefreshData,
  isFilterOpen,
  userLocation,
  parentState,
  onFetchData,
  mapHeight,
  loading,
  places,
  error,
}: Props): Object => {
  const shouldShowLoading = loading && !error && places.length === 0;

  return (
    <Wrapper>
      {shouldShowLoading && <Loading />}
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
          <Fragment>
            <ListScreen
              isAllDataFetched={isAllDataFetched}
              onPressListItem={onPressListItem}
              onEndListReached={onFetchData}
              onRefreshData={onRefreshData}
              loading={loading}
              places={places}
            />
            {mapHeight > 0 && (
              <MapScreen
                onNavigateToMainStack={this.onNavigateToMainStack}
                isAllDataFetched={isAllDataFetched}
                onPressListItem={onPressListItem}
                onEndListReached={onFetchData}
                userLocation={userLocation}
                mapHeight={mapHeight}
                loading={loading}
                places={places}
              />
            )}
          </Fragment>
        </ContentWrapper>
        {shouldShowDarkLayer && (
          <TouchableWithoutFeedback
            onPress={onPressDarkLayer}
          >
            <DarkLayer />
          </TouchableWithoutFeedback>
        )}
        <Filter
          onSearchWithFilter={onSearchWithFilter}
          onToggleFilter={onToggleFilter}
          isVisible={isFilterOpen}
        />
      </Fragment>
    </Wrapper>
  );
};

export default HomeComponent;
