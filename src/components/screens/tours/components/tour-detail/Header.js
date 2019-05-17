//  @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const TourTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textColor};
`;

const SubTitle = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => 1.1 * theme.metrics.largeSize}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subText};
`;

type Props = {
  subTitle: string,
  title: string,
};

const Header = ({ subTitle, title }: Props): Object => (
  <Wrapper>
    <TourTitle>{title}</TourTitle>
    <SubTitle>{subTitle}</SubTitle>
  </Wrapper>
);

export default Header;
