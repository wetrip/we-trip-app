// @flow

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../styles';
import Icon from '../../../../common/Icon';

const Container = styled(View)`
  position: absolute;
`;

const Switcher = styled(TouchableOpacity)`
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  border-top-left-radius: ${({ isUpperSwitcher, theme }) => (isUpperSwitcher ? theme.metrics.mediumSize : 0)}px;
  border-top-right-radius: ${({ isUpperSwitcher, theme }) => (isUpperSwitcher ? theme.metrics.mediumSize : 0)}px;
  border-bottom-left-radius: ${({ isUpperSwitcher, theme }) => (!isUpperSwitcher ? theme.metrics.mediumSize : 0)}px;
  border-bottom-right-radius: ${({ isUpperSwitcher, theme }) => (!isUpperSwitcher ? theme.metrics.mediumSize : 0)}px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.contrastColor : theme.colors.white)};
  margin-right: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-bottom: ${({ indexScreenSelected, withMarginBottom, theme }) => {
    if (withMarginBottom && indexScreenSelected === 0) {
      return (
        theme.metrics.getWidthFromDP('16%')
        + theme.metrics.getHeightFromDP('16%')
      );
    }

    if (withMarginBottom && indexScreenSelected) {
      return theme.metrics.extraLargeSize;
    }

    return 0;
  }}px;
`;

type Props = {
  onChooseScreenIndex: Function,
  indexScreenSelected: number,
};

const ScreenSwitcher = ({
  onChooseScreenIndex,
  indexScreenSelected,
}: Props): Object => (
  <Container>
    <Switcher
      onPress={() => onChooseScreenIndex(0)}
      isSelected={indexScreenSelected === 0}
      isUpperSwitcher
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Icon
        name="map"
        size={24}
        color={
          indexScreenSelected === 0
            ? appStyles.colors.white
            : appStyles.colors.inactiveTabIcon
        }
      />
    </Switcher>
    <Switcher
      indexScreenSelected={indexScreenSelected}
      onPress={() => onChooseScreenIndex(1)}
      isSelected={indexScreenSelected === 1}
      isUpperSwitcher={false}
      withMarginBottom
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Icon
        name="format-list-bulleted"
        size={24}
        color={
          indexScreenSelected === 1
            ? appStyles.colors.white
            : appStyles.colors.inactiveTabIcon
        }
      />
    </Switcher>
  </Container>
);

export default ScreenSwitcher;
