// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.getHeightFromDP('6%')}px;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
`;

const Button = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('35%')}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('6%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('20%')}px;
  background-color: ${({ theme }) => theme.colors.contrastColor};
`;

const SearchText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  onPressSearch: Function,
};

const SearchButton = ({ onPressSearch }: Props): Object => (
  <Wrapper>
    <Button
      onPress={onPressSearch}
    >
      <SearchText>SEARCH</SearchText>
    </Button>
  </Wrapper>
);

export default SearchButton;
