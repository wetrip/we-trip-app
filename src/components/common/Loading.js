// @flow

import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import styled from 'styled-components';
import appStyles from '../../styles';

const LoadingWrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const Loading = (): Object => (
  <LoadingWrapper>
    <ActivityIndicator
      color={appStyles.colors.textColor}
      size="large"
    />
  </LoadingWrapper>
);

export default Loading;
