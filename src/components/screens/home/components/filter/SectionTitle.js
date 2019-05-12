// @flow

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const Title = styled(Text)`
  margin-top: ${({ withMarginTop, theme }) => (withMarginTop
    ? 2 * theme.metrics.extraLargeSize
    : theme.metrics.extraLargeSize)}px;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
  withMarginTop: boolean,
  children: Object,
};

const SectionTitle = ({ withMarginTop, children }: Props): Object => (
  <Title
    withMarginTop={withMarginTop}
  >
    {children}
  </Title>
);

export default SectionTitle;
