// @flow

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../styles';
import DefaultText from '../DefaultText';

const Wrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
  isOpen: boolean,
};

const IsPlaceOpenOrClosed = ({ isOpen }: Props): Object => {
  const { color, text } = isOpen
    ? { color: appStyles.colors.green, text: 'Open now' }
    : { color: appStyles.colors.red, text: 'Closed now' };

  return (
    <Wrapper>
      <DefaultText
        color={color}
        weight={700}
      >
        {`${'\u2022'} ${text}`}
      </DefaultText>
    </Wrapper>
  );
};

export default IsPlaceOpenOrClosed;
