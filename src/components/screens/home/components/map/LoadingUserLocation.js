// @react

import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../styles';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const LoadingText = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  font-weight: 800;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.white};
`;

const LoadingUserLocation = (): Object => (
  <Wrapper>
    <View>
      <ActivityIndicator
        color={appStyles.colors.white}
        size="large"
      />
      <LoadingText>Getting your Location...</LoadingText>
    </View>
  </Wrapper>
);

export default LoadingUserLocation;
