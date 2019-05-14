// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import SectionTitle from '../SectionTitle';

const Container = styled(View)`
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const CategoriesWrapper = styled(View)`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
`;

const CategoryWrapper = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: 5px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.contrastColor : theme.colors.white)};
`;

const CategoryText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-weight: 700;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.textColor)};
`;

const CATEGORIES = Array(10)
  .fill({})
  .map((item, index) => ({
    id: `category-${index + 1}`,
    title: `Category-${index + 1}`,
  }));

type Props = {
  categories: Array<string>,
  onSetCategory: Function,
};

const Categories = ({ onSetCategory, categories }: Props): Object => (
  <Container>
    <SectionTitle>Categories</SectionTitle>
    <CategoriesWrapper>
      {CATEGORIES.map((category) => {
        const isSelected = categories.includes(category.id);

        return (
          <CategoryWrapper
            onPress={() => onSetCategory(category.id)}
            isSelected={isSelected}
            key={category.id}
          >
            <CategoryText
              isSelected={isSelected}
            >
              {category.title}
            </CategoryText>
          </CategoryWrapper>
        );
      })}
    </CategoriesWrapper>
  </Container>
);

export default Categories;
