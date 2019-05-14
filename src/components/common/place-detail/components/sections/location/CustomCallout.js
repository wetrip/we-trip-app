// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  flex: 1;
`;

const Address = styled(Text)`
  color: ${({ theme }) => theme.colors.textColor};
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
  address: string,
};

const CustomCallout = ({ address }: Props): Object => (
  <Wrapper>
    <Address>{address}</Address>
  </Wrapper>
);

export default CustomCallout;
