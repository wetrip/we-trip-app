// @flow

import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import DefaultPlaceListItem from '../../../../common/DefaultPlaceListItem';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const DefaultText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.textColor};
  font-weight: 900;
`;

const PlacesMap = (): Object => (
  <Wrapper>
    <DefaultPlaceListItem
      imageURL="https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/dishes/fast-food/medium/carrot-and-houmous-rollups.jpeg"
      name="Oceanário de Lisboa"
      distanceToUser={2.3}
      isOpen
    />
  </Wrapper>
);

export default PlacesMap;
