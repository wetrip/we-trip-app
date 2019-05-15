// @flow

import React from 'react';
import { View, Platform, Text } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import DefaultText from '../../DefaultText';
import Icon from '../../../../Icon';

const Wrapper = styled(View)`
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
`;

const ExtraInfoWrapper = styled(View)`
  margin-vertical: ${({ theme }) => theme.metrics.smallSize}px;
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

const StationTitle = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-right: ${({ isTitle, theme }) => (isTitle ? theme.metrics.smallSize : 0)}px;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize};
  font-weight: 700;
  color: ${({ isTitle, theme }) => (isTitle ? theme.colors.textColor : theme.colors.subText)};
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
  isAccessible: boolean,
  stationName: string,
  isNocturne: boolean,
  description: string,
  isDiurnal: boolean,
  price: string,
};

const renderTextWithIconRow = (text: string, iconName: string): Object => (
  <Row>
    <Icon
      name={iconName}
      color={appStyles.colors.contrastColor}
      size={22}
    />
    <DefaultText
      color={appStyles.colors.subText}
      withMarginLeft
      weight={Platform.select({
        android: 400,
        ios: 600,
      })}
    >
      {text}
    </DefaultText>
  </Row>
);

const TicketListItem = ({
  isNocturne,
  isDiurnal,
  stationName,
  description,
  isAccessible,
  price,
}: Props): Object => (
  <Wrapper>
    <Row>
      <StationTitle
        isTitle
      >
Station:
      </StationTitle>
      <StationTitle>{stationName}</StationTitle>
    </Row>
    <ExtraInfoWrapper>
      {renderTextWithIconRow(
        isNocturne ? 'Nocturn' : 'Diurnal',
        'clock-outline',
      )}
      {renderTextWithIconRow(description, 'chart-line-variant')}
      {renderTextWithIconRow(
        isAccessible ? 'Accessible' : 'Not Accessible',
        'wheelchair-accessibility',
      )}
    </ExtraInfoWrapper>
    <BottomLine />
    <BottomContent>
      <TicketValue>{price}</TicketValue>
    </BottomContent>
  </Wrapper>
);

export default TicketListItem;
