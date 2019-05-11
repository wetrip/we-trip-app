// @flow

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import appStyles from '../../styles';
import Icon from './Icon';

const ContentWrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('16%')}px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}PX;
`;

const TextContentWrapper = styled(View)`
  width: 70%;
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const PlaceImage = styled(FastImage).attrs(({ uri }) => ({
  source: { priority: FastImage.priority.low, uri },
}))`
  width: 30%;
  height: 100%;
  border-radius: 6px;
`;

const PlaceName = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('5.5%')}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textColor};
`;

const PlaceStatus = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-top: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-weight: 600;
  color: ${({ theme, isOpen }) => (isOpen ? theme.colors.green : theme.colors.red)};
`;

const DistanceText = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-left: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subText};
`;

const DistanceWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
  distanceToUser: Number,
  imageURL: string,
  isOpen: boolean,
  name: string,
};

const DefaultPlaceListItem = ({
  distanceToUser,
  imageURL,
  isOpen,
  name,
}: Props): Object => (
  <ContentWrapper>
    <PlaceImage
      uri={imageURL}
    />
    <TextContentWrapper>
      <PlaceName>{name}</PlaceName>
      <PlaceStatus
        isOpen={isOpen}
      >
        {isOpen ? 'Open Now' : 'Closed Now'}
      </PlaceStatus>
      <DistanceWrapper>
        <Icon
          color={appStyles.colors.primaryColor}
          name="routes"
          size={22}
        />
        <DistanceText>
          {distanceToUser}
          {' '}
km from you
        </DistanceText>
      </DistanceWrapper>
    </TextContentWrapper>
  </ContentWrapper>
);

export default DefaultPlaceListItem;
