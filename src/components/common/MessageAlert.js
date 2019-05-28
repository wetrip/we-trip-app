// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../styles';
import Icon from './Icon';

const Container = styled(View)`
  height: 90%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const ContentWrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const BigText = styled(Text)`
  text-align: center;
  font-weight: 800;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const MediumText = styled(Text)`
  text-align: center;
  font-weight: 800;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6.5%')}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const SmallText = styled(Text)`
  margin-vertical: ${({ theme }) => 2 * theme.metrics.extraLargeSize}px;
  text-align: center;
  font-weight: 600;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.subText};
`;

export const MESSAGE_TYPES = {
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  NO_PLACES: 'NO_PLACES',
  NO_TOURS: 'NO_TOURS',
};

const MESSAGES = {
  [MESSAGE_TYPES.CONNECTION_ERROR]: {
    description:
      'Seems like that we had some troubles with your connection with the server.',
    iconName: 'alert-circle',
    tip: 'Try again later.',
    title: 'Oops...',
  },

  [MESSAGE_TYPES.NO_TOURS]: {
    description: "Seems like that we don't have any tour to offer you today.",
    iconName: 'briefcase-remove',
    tip: 'Sorry about that.',
    title: 'This is weird...',
  },

  [MESSAGE_TYPES.NO_PLACES]: {
    tip: 'No places found for your search.',
    iconName: 'earth-off',
    description: '',
    title: '',
  },
};

type Props = {
  type: string,
};

const MessageAlert = ({ type }: Props): Object => {
  if (!MESSAGES[type]) {
    return null;
  }

  const {
    description, iconName, title, tip,
  } = MESSAGES[type];

  return (
    <Container>
      <ContentWrapper>
        <Icon
          size={appStyles.metrics.getWidthFromDP('45%')}
          color={appStyles.colors.textColor}
          name={iconName}
        />
        {!!title && <BigText>{title}</BigText>}
        {!!description && <SmallText>{description}</SmallText>}
        {!!tip && <MediumText>{tip}</MediumText>}
      </ContentWrapper>
    </Container>
  );
};

export default MessageAlert;
