import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled(View)`
  width: 94%;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => 1.5 * theme.metrics.extraLargeSize}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;

type Props = {
  children: Object,
};

const SectionWrapper = ({ children }: Props): Object => (
  <Wrapper>{children}</Wrapper>
);

export default SectionWrapper;
