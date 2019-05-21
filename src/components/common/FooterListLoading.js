// @flow

import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';

import appStyles from '../../styles';

const Wrapper = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: ${({ withHorizontalList, theme }) => (withHorizontalList ? 0 : theme.metrics.extraLargeSize)}px;
  margin-bottom: ${({ withHorizontalList, theme }) => (withHorizontalList ? 0 : theme.metrics.largeSize)}px;
  margin-left: ${({ withHorizontalList, theme }) => (withHorizontalList ? theme.metrics.largeSize : 0)}px;
  margin-right: ${({ withHorizontalList, theme }) => (withHorizontalList ? theme.metrics.extraLargeSize : 0)}px;
`;

type Props = {
  withHorizontalList: boolean,
  styleProps: Object,
};

const FooterListLoading = ({
  withHorizontalList,
  styleProps,
}: Props): Object => (
  <Wrapper
    withHorizontalList={withHorizontalList}
    style={{
      ...styleProps,
    }}
  >
    <ActivityIndicator
      color={appStyles.colors.textColor}
      size="small"
    />
  </Wrapper>
);

export default FooterListLoading;
