// @flow

import React, { Fragment } from 'react';
import { Slider, Text, View } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import SectionTitle from '../SectionTitle';

const Container = styled(View)`
  padding-right: ${({ theme }) => theme.metrics.largeSize}px;
  padding-left: ${({ theme }) => theme.metrics.largeSize}px;
  opacity: ${({ opacity }) => opacity};
`;

const TextWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const RadiusBoundsText = styled(Text)`
  font-size: ${({ theme }) => 1.5 * theme.metrics.mediumSize}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subText};
`;

const RadiusSelected = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textColor};
`;

const _sliderRef: Object = null;

type Props = {
  shouldDisableMaximumRadiusSearch: boolean,
  onSetSliderRef: Function,
  onSetMaxRadius: Function,
  maxRadius: number,
};

const MaxRadiusSearch = ({
  shouldDisableMaximumRadiusSearch,
  onSetSliderRef,
  onSetMaxRadius,
  maxRadius,
}: Props): Object => {
  const opacity = shouldDisableMaximumRadiusSearch ? 0.3 : 1;

  return (
    <Container
      opacity={opacity}
    >
      <SectionTitle
        withMarginTop
      >
Maximum radius of search
      </SectionTitle>
      <TextWrapper>
        <RadiusBoundsText>1 km</RadiusBoundsText>
        <RadiusSelected>{`${maxRadius || 1} km`}</RadiusSelected>
        <RadiusBoundsText>15 km</RadiusBoundsText>
      </TextWrapper>
      <Slider
        minimumTrackTintColor={appStyles.colors.contrastColor}
        onValueChange={distance => onSetMaxRadius(distance)}
        ref={ref => onSetSliderRef(ref)}
        thumbTintColor={appStyles.colors.white}
        disabled={shouldDisableMaximumRadiusSearch}
        maximumValue={15}
        minimumValue={1}
        step={0.5}
        style={{
          opacity,
        }}
      />
    </Container>
  );
};

export default MaxRadiusSearch;
