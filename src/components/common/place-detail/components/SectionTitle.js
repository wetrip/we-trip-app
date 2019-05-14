// @flow

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const Title = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.mediumSize}px;
  font-weight: 800;
  font-size: ${({ theme }) => 1.3 * theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
  children: string,
};

const SectionTitle = ({ children }: Props): Object => <Title>{children}</Title>;

export default SectionTitle;
