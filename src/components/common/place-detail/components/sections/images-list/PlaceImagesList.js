// @flow

import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';

import PlaceImagesListItem from './PlaceImagesListItem';

const ImagesList = styled(FlatList)`
  flex: 1;
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-bottom: ${({ theme }) => 1.5 * theme.metrics.extraLargeSize}px;
`;

const IMAGES = [
  'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/coco-bambu-sul.jpeg',
  'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/misaki.jpeg',
  'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/cabana-riomar.jpeg',
];

const PlaceImagesList = (): Object => (
  <ImagesList
    keyExtractor={imageURL => imageURL}
    showsHorizontalScrollIndicator={false}
    data={IMAGES}
    horizontal
    renderItem={({ item, index }) => (
      <PlaceImagesListItem
        isFirst={index === 0}
        imageURL={item}
      />
    )}
  />
);

export default PlaceImagesList;
