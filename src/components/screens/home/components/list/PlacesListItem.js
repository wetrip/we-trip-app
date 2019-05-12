// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

const Wrapper = styled(TouchableOpacity)`
  height: ${({ theme }) => theme.metrics.getHeightFromDP('25%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.metrics.extraLargeSize}px;
  background-color: ${({ theme }) => theme.colors.darkLayer};
  border-radius: 6px;
`;

const PlaceName = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.white};
`;

const PlaceImage = styled(FastImage).attrs(({ uri }) => ({
  source: { priority: FastImage.priority.low, uri },
}))`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  position: absolute;
`;

type Props = {
  onPressListItem: Function,
  imageURL: string,
  name: string,
  id: string,
};

const PlacesListItem = ({
  onPressListItem,
  name,
  imageURL,
  id,
}: Props): Object => (
  <Wrapper
    onPress={() => onPressListItem(id)}
  >
    <PlaceImage
      uri={imageURL}
    />
    <DarkLayer>
      <PlaceName>{name}</PlaceName>
    </DarkLayer>
  </Wrapper>
);

export default PlacesListItem;
