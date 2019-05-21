// @flow

import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  Platform,
  FlatList,
  View,
} from 'react-native';
import styled from 'styled-components';

import FooterListLoading from '../../../../common/FooterListLoading';
import PlacesListItem from './PlacesListItem';
import appStyles from '../../../../../styles';

const List = styled(FlatList)`
  width: ${({ theme }) => theme.metrics.width}px;
`;

const FooterLoadingWrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const renderFooterLoading = (isLoading: boolean): Object => (
  <FooterLoadingWrapper>
    <ActivityIndicator
      color={appStyles.colors.textColor}
      size="small"
    />
  </FooterLoadingWrapper>
);

type Place = {
  distanceToUser: number,
  location: LatLng,
  imageURL: string,
  isOpen: boolean,
  name: string,
  id: number,
};

type Props = {
  onEndListReached: Function,
  isAllDataFetched: boolean,
  onPressListItem: Function,
  onRefreshData: Function,
  places: Array<Place>,
  loading: boolean,
};

const PlacesList = ({
  isAllDataFetched,
  onEndListReached,
  onPressListItem,
  onRefreshData,
  loading,
  places,
}): Object => (
  <List
    ListFooterComponent={() => (!isAllDataFetched || loading) && (
    <FooterListLoading
      withHorizontalList={false}
      styleProps={{
        height: '0%',
      }}
    />
    )
    }
    onEndReachedThreshold={Platform.select({
      android: 0.5,
      ios: 0.1,
    })}
    onEndReached={() => {
      if (!isAllDataFetched) {
        onEndListReached();
      }
    }}
    renderItem={({ item, index }) => (
      <PlacesListItem
        {...item}
        onPressListItem={onPressListItem}
      />
    )}
    keyExtractor={item => `${item.id}`}
    showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl
        progressBackgroundColor={appStyles.colors.primaryColor}
        refreshing={loading && places.length === 0}
        tintColor={appStyles.colors.primaryColor}
        colors={[appStyles.colors.white]}
        onRefresh={onRefreshData}
      />
    }
    initialNumToRender={5}
    data={places}
  />
);

export default PlacesList;
