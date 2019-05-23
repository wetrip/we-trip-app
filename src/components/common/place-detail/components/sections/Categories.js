// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../styles';
import SectionTitle from '../SectionTitle';
import DefaultText from '../DefaultText';

const Wrapper = styled(View)`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: ${({ theme }) => theme.metrics.largeSize}px;
  margin-bottom: ${({ theme }) => 1.5 * theme.metrics.extraLargeSize}px;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ContentWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
`;

type Category = {
  name: string,
  id: number,
};

type Props = {
  categories: Array<Category>,
};

const Categories = ({ categories }: Props): Object => (
  <Fragment>
    <SectionTitle>Categories</SectionTitle>
    <Wrapper>
      {categories.map(category => (
        <ContentWrapper
          key={category.id}
        >
          <DefaultText
            color={appStyles.colors.textColor}
            weight={700}
          >
            {category.name}
          </DefaultText>
        </ContentWrapper>
      ))}
    </Wrapper>
  </Fragment>
);

export default Categories;
