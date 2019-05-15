// @flow

import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '../../../../../utils/CONSTANTS';
import SectionWrapper from '../SectionWrapper';
import appStyles from '../../../../../styles';
import SectionTitle from '../SectionTitle';
import DefaultText from '../DefaultText';

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ isLast, theme }) => (isLast ? 0 : theme.metrics.mediumSize)}px;
`;

const PRICES = [
  {
    PriceTypeId: 1,
    price: '11,90 €',
  },
  {
    PriceTypeId: 2,
    price: '12,90 €',
  },
  {
    PriceTypeId: 3,
    price: '9,90 €',
  },
  {
    PriceTypeId: 4,
    price: '10,90 €',
  },
];

const Prices = (): Object => (
  <Fragment>
    <SectionTitle>Prices</SectionTitle>
    <SectionWrapper>
      {PRICES.map((item, index) => {
        const label = CONSTANTS.VALUES.TYPE_PRICES_TICKETS[item.PriceTypeId];

        return (
          <Row
            isLast={index === PRICES.length - 1}
            key={item.PriceTypeId}
          >
            <DefaultText
              color={appStyles.colors.textColor}
              withMarginRight
              weight={800}
            >
              {`${label}:`}
            </DefaultText>
            <DefaultText
              color={appStyles.colors.subText}
              weight={600}
            >
              {item.price}
            </DefaultText>
          </Row>
        );
      })}
    </SectionWrapper>
  </Fragment>
);

export default Prices;
