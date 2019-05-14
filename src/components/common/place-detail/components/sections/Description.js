// @flow

import React, { Fragment } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

import SectionWrapper from '../SectionWrapper';
import SectionTitle from '../SectionTitle';

const DescriptionText = styled(Text)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subText};
  font-size: ${({ theme }) => theme.metrics.largeSize};
`;

type Props = {
  description: string,
};

const Description = ({ description }: Props): Object => (
  <Fragment>
    <SectionTitle>Description</SectionTitle>
    <SectionWrapper>
      <DescriptionText>{description}</DescriptionText>
    </SectionWrapper>
  </Fragment>
);

export default Description;
