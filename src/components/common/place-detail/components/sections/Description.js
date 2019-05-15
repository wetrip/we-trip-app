// @flow

import React, { Fragment } from 'react';
import { Platform, Text, View } from 'react-native';

import SectionWrapper from '../SectionWrapper';
import appStyles from '../../../../../styles';
import SectionTitle from '../SectionTitle';
import DefaultText from '../DefaultText';

type Props = {
  description: string,
};

const Description = ({ description }: Props): Object => (
  <Fragment>
    <SectionTitle>Description</SectionTitle>
    <SectionWrapper>
      <DefaultText
        color={appStyles.colors.subText}
        weight={Platform.select({
          android: 400,
          ios: 500,
        })}
      >
        {description}
      </DefaultText>
    </SectionWrapper>
  </Fragment>
);

export default Description;
