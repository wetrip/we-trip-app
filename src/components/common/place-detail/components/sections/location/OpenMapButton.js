// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, Linking, View,
} from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import Icon from '../../../../Icon';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  padding: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ButtonWrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('14%')}px;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('32%')}px;
  margin-left: ${({ theme }) => theme.metrics.getWidthFromDP('72%')}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('7%')}px;
  background-color: ${({ theme }) => theme.colors.blue};
  position: absolute;
`;

const onPressButton = (location: Object, placeName: string): void => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${location.latitude},${location.longitude}`;
  const url = Platform.select({
    ios: `${scheme}${placeName}@${latLng}`,
    android: `${scheme}${latLng}(${placeName})`,
  });

  Linking.openURL(url);
};

type Props = {
  placeName: string,
  location: Object,
};

const OpenMapButton = ({ placeName, location }: Props): Object => (
  <ButtonWrapper
    onPress={() => onPressButton(location, placeName)}
  >
    <Icon
      color={appStyles.colors.white}
      name="navigation"
      size={24}
    />
  </ButtonWrapper>
);

export default OpenMapButton;
