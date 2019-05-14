// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import SectionWrapper from '../../SectionWrapper';
import appStyles from '../../../../../../styles';
import SectionTitle from '../../SectionTitle';

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ isLast, theme }) => (isLast ? 0 : theme.metrics.mediumSize)}px;
`;

const DefaultText = styled(Text)`
  margin-right: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => 1.5 * theme.metrics.mediumSize}px;
  color: ${({ isMainText, theme }) => (isMainText ? theme.colors.textColor : theme.colors.subText)};
  font-weight: ${({ isMainText }) => (isMainText ? 700 : 500)};
`;

const getPriceLabel = (PriceTypeId: number): string => {
  const labels = {
    1: 'Adult',
    2: 'Senior',
    3: 'Child',
    4: 'Students',
  };

  return labels[PriceTypeId];
};

const PRICES = [
  {
    PriceTypeId: 1,
    price: '€ 11,90',
  },
  {
    PriceTypeId: 2,
    price: '€ 12,90',
  },
  {
    PriceTypeId: 3,
    price: '€ 9,90',
  },
  {
    PriceTypeId: 4,
    price: '€ 10,90',
  },
];

const Prices = (): Object => (
  <Fragment>
    <SectionTitle>Prices</SectionTitle>
    <SectionWrapper>
      {PRICES.map((item, index) => {
        const label = getPriceLabel(item.PriceTypeId);

        return (
          <Row
            isLast={index === PRICES.length - 1}
            key={item.PriceTypeId}
          >
            <DefaultText
              isMainText
            >
              {`${label}:`}
            </DefaultText>
            <DefaultText>{item.price}</DefaultText>
          </Row>
        );
      })}
    </SectionWrapper>
  </Fragment>
);

export default Prices;
