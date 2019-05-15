// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, Text, View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import appStyles from '../../../../styles';

const ItemWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('80%')}px;
  margin-left: ${({ datasetLength, index, theme }) => {
    if (index === 0) {
      return theme.metrics.getWidthFromDP('10%');
    }

    if (index === datasetLength - 1) {
      return theme.metrics.smallSize;
    }

    if (index === 1) {
      return theme.metrics.smallSize;
    }

    return theme.metrics.smallSize;
  }}px;
  margin-right: ${({ datasetLength, index, theme  }) => {
    if (index === datasetLength - 1) {
      return theme.metrics.getWidthFromDP('10%');
    }

    if (index === 0) {
      return theme.metrics.smallSize;
    }

    if (index === datasetLength - 2) {
      return theme.metrics.smallSize;
    }

    return theme.metrics.smallSize;
  }}px;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled(View)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
`;

const TourImage = styled(FastImage).attrs(({ uri }) => ({
  source: { priority: FastImage.priority.low, uri },
}))`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('35%')};px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const DefaultText = styled(Text).attrs(({ numberOfLines }) => ({
  numberOfLines: numberOfLines || 1,
}))`
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
`;

const BottomContent = styled(View)`
  width: 100%;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
  max-height: ${({ theme }) => theme.metrics.getHeightFromDP('35%')};px;
`;

const TourDescriptionTextWrapper = styled(View)`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
`;

const StartButton = styled(TouchableOpacity)`
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.contrastColor};
  border-radius: 5px;
`;

const BottomRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  onPressStartButton: Function,
  numberOfDestinatios: number,
  datasetLength: number,
  description: string,
  imageURL: string,
  index: number,
  title: string,
};

const ToursListItem = ({
  numberOfDestinatios,
  onPressStartButton,
  datasetLength,
  description,
  imageURL,
  index,
  title,
}): Object => (
  <ItemWrapper
    datasetLength={datasetLength}
    index={index}
  >
    <CardWrapper
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
    >
      <TourImage
        uri={imageURL}
      />
      <BottomContent>
        <DefaultText
          size={appStyles.metrics.extraLargeSize}
          color={appStyles.colors.textColor}
          numberOfLines={2}
          weight={800}
        >
          {title}
        </DefaultText>
        <TourDescriptionTextWrapper>
          <DefaultText
            size={appStyles.metrics.largeSize}
            color={appStyles.colors.subText}
            numberOfLines={4}
            weight={Platform.select({
              android: 400,
              ios: 600,
            })}
          >
            {description}
          </DefaultText>
        </TourDescriptionTextWrapper>
        <BottomRow>
          <DefaultText
            size={appStyles.metrics.largeSize}
            color={appStyles.colors.textColor}
            weight={800}
          >
            {`${numberOfDestinatios} ${
              numberOfDestinatios === 1 ? 'Destination' : 'Destinations'
            }`}
          </DefaultText>
          <StartButton
            onPress={onPressStartButton}
          >
            <DefaultText
              size={appStyles.metrics.largeSize}
              color={appStyles.colors.white}
              weight={800}
            >
              START
            </DefaultText>
          </StartButton>
        </BottomRow>
      </BottomContent>
    </CardWrapper>
  </ItemWrapper>
);

export default ToursListItem;
