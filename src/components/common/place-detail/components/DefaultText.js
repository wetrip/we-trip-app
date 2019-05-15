// @flow

import React from 'react';
import { Platform, Text } from 'react-native';
import styled from 'styled-components';

const CustomText = styled(Text)`
  margin-right: ${({ withMarginRight, theme }) => (withMarginRight ? theme.metrics.smallSize : 0)}px;
  margin-left: ${({ withMarginLeft, theme }) => (withMarginLeft ? theme.metrics.smallSize : 0)}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
`;

type Props = {
  withMarginRight: ?boolean,
  withMarginLeft: ?boolean,
  children: string,
  weight: number,
  color: string,
};

const DefaultText = ({
  withMarginRight,
  withMarginLeft,
  children,
  weight,
  color,
}: Props): Object => (
  <CustomText
    withMarginRight={withMarginRight}
    withMarginLeft={withMarginLeft}
    weight={weight}
    color={color}
  >
    {children}
  </CustomText>
);

export default DefaultText;
