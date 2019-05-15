// @flow

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('13%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('22%')}px;
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-left: ${({ isFirst, theme }) => (isFirst ? theme.metrics.mediumSize : 0)}px;
  border-top-left-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  border-top-right-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  border-bottom-left-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  border-bottom-right-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.contrastColor : theme.colors.white)};
`;

const DayOfWeekText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize};
  font-weight: 700;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.subText)};
`;

type Props = {
  onSelectItem: Function,
  isSelected: boolean,
  dayOfWeek: string,
  isFirst: boolean,
};

const OperatingHoursListItem = ({
  onSelectItem,
  isSelected,
  dayOfWeek,
  isFirst,
}: Props): Object => (
  <Wrapper
    isSelected={isSelected}
    onPress={onSelectItem}
    isFirst={isFirst}
  >
    <DayOfWeekText
      isSelected={isSelected}
    >
      {dayOfWeek}
    </DayOfWeekText>
  </Wrapper>
);

export default OperatingHoursListItem;
