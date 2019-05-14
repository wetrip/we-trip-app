// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import Icon from '../../../../Icon';

const Wrapper = styled(View)`
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-vertical: ${({ withMargin, theme }) => (withMargin ? theme.metrics.mediumSize : 0)}px;
`;

const BottomContent = styled(View)`
  width: 100%;
  align-items: flex-end;
`;

const TicketTitle = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textColor};
`;

const DefaultText = styled(Text).attrs({
  numberOfLines: 1, 
})`
  margin-horizontal: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subText};
`;

const TicketValue = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => 1.3 * theme.metrics.largeSize}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textColor};
`;

const BottomLine = styled(View)`
  width: 100%;
  height: 1px;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.subTextWhite};
`;

type Props = {
  operatingHourStart: string,
  operatingHourEnd: string,
  destination: string,
  origin: string,
  title: string,
  price: number,
};

const TicketListItem = ({
  operatingHourStart,
  operatingHourEnd,
  destination,
  origin,
  title,
  price,
}: Props): Object => (
  <Wrapper>
    <View>
      <TicketTitle>{title}</TicketTitle>
      <Row
        withMargin
      >
        <Icon
          name="directions"
          color={appStyles.colors.red}
          size={26}
        />
        <DefaultText>{origin}</DefaultText>
        <Icon
          name="arrow-right"
          color={appStyles.colors.subText}
          size={26}
        />
        <DefaultText>{destination}</DefaultText>
      </Row>
      <Row>
        <Icon
          name="clock-outline"
          color={appStyles.colors.red}
          size={26}
        />
        <DefaultText>{`${operatingHourStart} - ${operatingHourEnd}`}</DefaultText>
      </Row>
    </View>
    <BottomLine />
    <BottomContent>
      <Row>
        <Icon
          name="currency-eur"
          color={appStyles.colors.textColor}
          size={26}
        />
        <TicketValue>{price}</TicketValue>
      </Row>
    </BottomContent>
  </Wrapper>
);

export default TicketListItem;
