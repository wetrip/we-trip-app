// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('90%')}px;
  height: 100%;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-left: ${({ isFirst, theme }) => (isFirst ? theme.metrics.mediumSize : 0)}px;
`;

const PlaceImage = styled(FastImage).attrs(({ uri }) => ({
  source: { priority: FastImage.priority.low, uri },
}))`
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

type Props = {
  onPressImage: Function,
  isFirst: boolean,
  imageURL: string,
};

const PlaceImageListItem = ({
  onPressImage,
  imageURL,
  isFirst,
}: Props): Object => (
  <Wrapper
    onPress={onPressImage}
    isFirst={isFirst}
  >
    <PlaceImage
      uri={imageURL}
    />
  </Wrapper>
);

export default PlaceImageListItem;
