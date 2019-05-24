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
  image: Array<string>,
  location: LatLng,
  isOpen: boolean,
  name: string,
  id: number,
};

type Props = {
  onEndListReached: Function,
  isAllDataFetched: boolean,
  onPressListItem: Function,
  onRefreshData: Function,
  isRefreshing: boolean,
  places: Array<Place>,
  loading: boolean,
};

const PlacesList = ({
  isAllDataFetched,
  onEndListReached,
  onPressListItem,
  onRefreshData,
  isRefreshing,
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
        onPressListItem={() => onPressListItem(item.id)}
      />
    )}
    showsVerticalScrollIndicator={false}
    keyExtractor={item => `${item.id}`}
    refreshControl={
      <RefreshControl
        progressBackgroundColor={appStyles.colors.primaryColor}
        tintColor={appStyles.colors.primaryColor}
        colors={[appStyles.colors.white]}
        refreshing={isRefreshing}
        onRefresh={onRefreshData}
      />
    }
    initialNumToRender={5}
    data={places}
  />
);

export default PlacesList;
