// @flow

import React, { Fragment } from 'react';
import { TouchableWithoutFeedback, ScrollView, View } from 'react-native';
import styled from 'styled-components';

import MessageAlert, { MESSAGE_TYPES } from '../../../common/MessageAlert';
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
  images: Array<string>,
  location: LatLng,
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
  isRefreshing: boolean,
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
  isRefreshing,
  parentState,
  onFetchData,
  mapHeight,
  loading,
  places,
  error,
}: Props): Object => {
  const shouldShowNoPlacesMessage = !loading && !error && places.length === 0;
  const shouldShowErrorMessage = !loading && error && places.length === 0;
  const shouldShowLoading = loading && !error && places.length === 0;

  return (
    <Wrapper>
      {shouldShowLoading && <Loading />}
      {shouldShowNoPlacesMessage && (
        <MessageAlert
          type={MESSAGE_TYPES.NO_PLACES}
        />
      )}
      {shouldShowErrorMessage && (
        <MessageAlert
          type={MESSAGE_TYPES.CONNECTION_ERROR}
        />
      )}
      {places.length > 0 && (
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
                isRefreshing={isRefreshing}
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
        </Fragment>
      )}
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
    </Wrapper>
  );
};

export default HomeComponent;
