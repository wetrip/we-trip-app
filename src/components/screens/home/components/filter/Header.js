// @flow

import React, { Fragment } from 'react';
import {
  TouchableOpacity,
  Platform,
  View,
  Text,
  StatusBar,
} from 'react-native';
import styled from 'styled-components';

import isEqualsOrLargestThanIphoneX from '../../../../../utils/isEqualsOrLargestThanIphoneX';
import appStyles from '../../../../../styles';
import Icon from '../../../../common/Icon';

const APPBAR_HEIGHT = Platform.select({
  ios: isEqualsOrLargestThanIphoneX() ? 84 : 64,
  android: 56,
});

const Wrapper = styled(View)`
  width: 100%;
  height: ${APPBAR_HEIGHT}px;
  justify-content: ${Platform.OS === 'android' ? 'center' : 'flex-end'};
  align-items: center;
  padding-bottom: ${({ theme }) => (Platform.OS === 'ios' ? theme.metrics.mediumSize : 0)}px;
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ContentWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: ${Platform.OS === 'ios' ? 4 : 0}px;
`;

const Title = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme }) => 1.1 * theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const ResetText = styled(Text)`
  font-weight: 500;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.subText};
`;

const renderButton = (children: Object, onPress: Function): Object => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={{
      bottom: appStyles.metrics.smallSize,
      right: appStyles.metrics.smallSize,
      left: appStyles.metrics.smallSize,
      top: appStyles.metrics.smallSize,
    }}
  >
    {children}
  </TouchableOpacity>
);

type Props = {
  onCloseFilter: Function,
  onResetFilter: Function,
};

const Header = ({ onCloseFilter, onResetFilter }: Props): Object => (
  <Fragment>
    <StatusBar
      backgroundColor={appStyles.colors.androidToolbarColor}
      barStyle="dark-content"
    />
    <Wrapper
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      }}
    >
      <ContentWrapper>
        {renderButton(
          <Icon
            color={appStyles.colors.textColor}
            name="close"
            size={24}
          />,
          onCloseFilter,
        )}
        <Title>Filter</Title>
        {renderButton(<ResetText>RESET</ResetText>, onResetFilter)}
      </ContentWrapper>
    </Wrapper>
  </Fragment>
);

export default Header;
