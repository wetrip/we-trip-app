// @flow

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const PlaceNameText = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  font-weight: 800;
  font-size: ${({ theme }) => 1.8 * theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
  children: string,
};

const PlaceName = ({ children }: Props): Object => (
  <PlaceNameText>{children}</PlaceNameText>
);

export default PlaceName;
