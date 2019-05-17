// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, Text, View,
} from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../styles';
import Icon from '../../../common/Icon';

const Wrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const TextContentWrapper = styled(View)`
  width: 80%;
`;

const Title = styled(Text)`
  margin-bottom: ${({ theme }) => Platform.select({
    android: 0.5 * theme.metrics.extraSmallSize,
    ios: theme.metrics.extraSmallSize,
  })}px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const Description = styled(Text)`
  font-weight: ${Platform.select({
    android: 400,
    ios: 600,
  })};
  font-size: ${({ theme }) => 1.1 * theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.subText};
`;

type Props = {
  description: string,
  onPress: Function,
  title: string,
};

const SettingItemList = ({ description, onPress, title }): Object => (
  <Wrapper
    onPress={onPress}
  >
    <TextContentWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </TextContentWrapper>
    <Icon
      color={appStyles.colors.textColor}
      name="chevron-right"
      size={40}
    />
  </Wrapper>
);

export default SettingItemList;
