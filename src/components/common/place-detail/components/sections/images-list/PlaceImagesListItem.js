// @flow

import React from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

const PlaceImage = styled(FastImage).attrs(({ uri }) => ({
  source: { priority: FastImage.priority.low, uri },
}))`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('90%')}px;
  height: 100%;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-left: ${({ isFirst, theme }) => (isFirst ? theme.metrics.mediumSize : 0)}px;
  border-radius: 6px;
`;

type Props = {
  isFirst: boolean,
  imageURL: string,
};

const PlaceImageListItem = ({ isFirst, imageURL }: Props): Object => (
  <PlaceImage
    isFirst={isFirst}
    uri={imageURL}
  />
);

export default PlaceImageListItem;
