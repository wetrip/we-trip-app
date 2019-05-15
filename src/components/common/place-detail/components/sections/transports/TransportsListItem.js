// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import Icon from '../../../../Icon';

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('24%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('28%')}px;
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-left: ${({ isFirst, theme }) => (isFirst ? theme.metrics.mediumSize : 0)}px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.red : theme.colors.white)};
  border-radius: 6px;
`;

const ContentWrapper = styled(View)`
  justify-content: center;
  align-items: center;
`;

const OptionText = styled(Text)`
  font-size: ${({ theme }) => 1.1 * theme.metrics.mediumSize}px;
  font-weight: 600;
  color: ${({ color }) => color};
`;

type Props = {
  onSelectItem: Function,
  isSelected: boolean,
  isFirst: boolean,
  label: string,
  icon: string,
  id: number,
};

const TransportsListItem = ({
  onSelectItem,
  isSelected,
  isFirst,
  label,
  icon,
}: Props): Object => {
  const color = isSelected
    ? appStyles.colors.white
    : appStyles.colors.textColor;

  return (
    <Wrapper
      onPress={onSelectItem}
      isSelected={isSelected}
      isFirst={isFirst}
    >
      <ContentWrapper>
        <Icon
          name={icon}
          color={color}
          size={38}
        />
        <OptionText
          color={color}
        >
          {label}
        </OptionText>
      </ContentWrapper>
    </Wrapper>
  );
};

export default TransportsListItem;
