// @flow

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import Icon from '../../../../../common/Icon';
import SectionTitle from '../SectionTitle';

const Container = styled(View)`
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
`;

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const ItemWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const CheckBoxWrapper = styled(View)`
  width: ${({ theme }) => 2 * theme.metrics.extraLargeSize}px;
  justify-content: center;
`;

const Box = styled(View)`
  width: ${({ theme }) => 1.2 * theme.metrics.extraLargeSize}px;
  height: ${({ theme }) => 1.2 * theme.metrics.extraLargeSize}px;
  position: absolute;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ItemTitle = styled(Text)`
  font-size: ${({ theme }) => 1.5 * theme.metrics.mediumSize}px;
  font-weight: 700;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.textColor)};
`;

const ITEMS = [
  {
    id: 'all',
    title: 'All',
  },
  {
    id: 'paid',
    title: 'Paid',
  },
  {
    id: 'free',
    title: 'Free',
  },
];

type Props = {
  priceSelected: boolean,
  onSetPrice: Function,
};

const Price = ({ priceSelected, onSetPrice }: Props): Object => (
  <Container>
    <SectionTitle
      withMarginTop
    >
Price
    </SectionTitle>
    <Wrapper>
      {ITEMS.map((item) => {
        const isSelected = item.id === priceSelected;

        return (
          <ItemWrapper
            onPress={() => onSetPrice(item.id)}
            key={item.id}
          >
            <CheckBoxWrapper>
              <Box />
              {isSelected && (
                <Icon
                  color={appStyles.colors.contrastColor}
                  name="check"
                  size={20}
                />
              )}
            </CheckBoxWrapper>
            <ItemTitle>{item.title}</ItemTitle>
          </ItemWrapper>
        );
      })}
    </Wrapper>
  </Container>
);

export default Price;
