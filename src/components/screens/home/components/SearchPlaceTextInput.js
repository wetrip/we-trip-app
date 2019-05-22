// @flow

import React from 'react';
import { TextInput, View } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../styles';
import Icon from '../../../common/Icon';

const Wrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('73%')}px;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
  background-color: ${({ theme }) => theme.colors.textInputBackgroundColor};
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('35%')}px;
`;

const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.textInputTextColor,
  selectionColor: theme.colors.textInputTextColor,
  underlineColorAndroid: 'transparent',
  autoCapitalize: 'none',
  autoCorrect: false,
  placeholder: 'Search for a Place',
  returnKeyLabel: 'search',
  returnKeyType: 'search',
}))`
  width: 90%;
  height: 100%;
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textColor};
`;

const IconWrapper = styled(View)`
  padding-top: ${({ theme }) => theme.metrics.mediumSize};
  padding-left: ${({ theme }) => theme.metrics.mediumSize};
  padding-bottom: ${({ theme }) => theme.metrics.getWidthFromDP('2.5%')};
`;

type Props = {
  handleInputFocus: Function,
  onTypePlaceName: Function,
  onSearchPlace: Function,
  onSetInputRef: Function,
};

const SearchPlaceTextInput = ({
  handleInputFocus,
  onTypePlaceName,
  onSetInputRef,
  onSearchPlace,
}: Props): Object => (
  <Wrapper>
    <IconWrapper>
      <Icon
        color={appStyles.colors.textInputTextColor}
        name="magnify"
        size={22}
      />
    </IconWrapper>
    <Input
      onChangeText={text => onTypePlaceName(text)}
      onFocus={() => handleInputFocus(true)}
      onBlur={() => handleInputFocus(false)}
      ref={input => onSetInputRef(input)}
      onSubmitEditing={onSearchPlace}
    />
  </Wrapper>
);

export default SearchPlaceTextInput;
