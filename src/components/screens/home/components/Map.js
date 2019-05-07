// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.yellow};
`;

const DefaultText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
  font-weight: 900;
`;

const TestComponent = (): Object => (
  <Wrapper>
    <DefaultText>MAP</DefaultText>
  </Wrapper>
);

export default TestComponent;
