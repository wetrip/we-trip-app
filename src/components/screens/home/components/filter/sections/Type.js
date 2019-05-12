// @flow

import React from 'react';
import {
  TouchableOpacity, Platform, Text, View,
} from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import Icon from '../../../../../common/Icon';
import SectionTitle from '../SectionTitle';

const Container = styled(View)`
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
`;

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('28%')}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('20%')}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.contrastColor : theme.colors.white)};
  border-radius: 6px;
`;

const ContentWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemWrapper = styled(View)`
  justify-content: center;
  align-items: center;
`;

const ItemTitle = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => 1.2 * theme.metrics.mediumSize}px;
  font-weight: 700;
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.textColor)};
`;

const ITEMS = [
  {
    id: 'top_rated',
    title: 'Top Rated',
    icon: 'star',
  },
  {
    id: 'most_visited',
    title: 'Most Visited',
    icon: 'fire',
  },
  {
    id: 'nearby',
    title: 'Nearby',
    icon: 'map-marker-distance',
  },
];

type Props = {
  typeSelected: string,
  onSetType: Function,
};

const Type = ({ typeSelected, onSetType }: Props): Object => (
  <Container>
    <SectionTitle
      withMarginTop={false}
    >
Type
    </SectionTitle>
    <ContentWrapper>
      {ITEMS.map((item) => {
        const isSelected = item.id === typeSelected;

        return (
          <Wrapper
            isSelected={isSelected}
            onPress={() => onSetType(item.id)}
            key={item.id}
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
            <ItemWrapper>
              <Icon
                color={
                  isSelected
                    ? appStyles.colors.white
                    : appStyles.colors.textColor
                }
                size={40}
                name={item.icon}
              />
              <ItemTitle
                isSelected={isSelected}
              >
                {item.title}
              </ItemTitle>
            </ItemWrapper>
          </Wrapper>
        );
      })}
    </ContentWrapper>
  </Container>
);

export default Type;
