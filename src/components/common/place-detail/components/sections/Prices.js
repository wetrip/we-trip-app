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

type Price = {
  priceTypeId: number,
  price: string,
};

type Props = {
  prices: Array<Price>,
};

const Prices = ({ prices }: Props): Object => (
  <Fragment>
    <SectionTitle>Prices</SectionTitle>
    <SectionWrapper>
      {prices.map((item, index) => {
        const label = CONSTANTS.VALUES.TYPE_PRICES_TICKETS[item.priceTypeId];

        return (
          <Row
            isLast={index === prices.length - 1}
            key={item.priceTypeId}
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
