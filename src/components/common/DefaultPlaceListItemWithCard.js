// @flow

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from '../../utils/isEqualsOrLargestThanIphoneX';
import DefaultPlaceListItem from './DefaultPlaceListItem';

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('94%')}px;
  justify-content: center;
  align-items: center;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => (isEqualsOrLargestThanIphoneX()
    ? 1.3 * theme.metrics.extraLargeSize
    : theme.metrics.mediumSize)}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
`;

type Props = {
  onPressListItem: Function,
  distanceToUser: number,
  imageURL: string,
  isOpen: boolean,
  name: string,
};

const DefaultPlaceListItemWithCard = ({
  onPressListItem,
  distanceToUser,
  imageURL,
  isOpen,
  name,
}: Props): Object => (
  <Wrapper
    onPress={onPressListItem}
    style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}
  >
    <DefaultPlaceListItem
      distanceToUser={distanceToUser}
      imageURL={imageURL}
      isOpen={isOpen}
      name={name}
    />
  </Wrapper>
);

export default DefaultPlaceListItemWithCard;
