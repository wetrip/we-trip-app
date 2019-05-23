// @flow

import React, { Fragment, Component } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import OperatingHoursListItem from './OperatingHoursListItem';
import CONSTANTS from '../../../../../../utils/CONSTANTS';
import SectionWrapper from '../../SectionWrapper';
import appSyles from '../../../../../../styles';
import SectionTitle from '../../SectionTitle';
import DefaultText from '../../DefaultText';

const List = styled(FlatList)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const Row = styled(View)`
  flex-direction: row;
  margin-bottom: ${({ withMarginBottom, theme }) => (withMarginBottom ? theme.metrics.mediumSize : 0)}px;
`;

type OperatingHour = {
  dayOfWeek: number,
  closeAt: string,
  openAt: string,
};

type Props = {
  operatingHours: Array<OperatingHour>,
};

type State = {
  indexDaySelected: number,
};

class OperatingHours extends Component<Props, State> {
  state = {
    indexDaySelected: 0,
  };

  onSelectItem = (indexDaySelected: number): void => {
    this.setState({
      indexDaySelected,
    });
  };

  render() {
    const { indexDaySelected } = this.state;
    const { operatingHours } = this.props;
    const { openAt, closeAt } = operatingHours[indexDaySelected];

    return (
      <Fragment>
        <SectionTitle>Operating Hours</SectionTitle>
        <List
          keyExtractor={item => `${item.dayOfWeek}`}
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          extraData={this.state}
          data={operatingHours}
          horizontal
          renderItem={({ item, index }) => {
            const dayOfWeek = CONSTANTS.VALUES.DAYS_OF_WEEK[item.dayOfWeek];

            return (
              <OperatingHoursListItem
                onSelectItem={() => this.onSelectItem(index)}
                isSelected={index === indexDaySelected}
                isFirst={index === 0}
                dayOfWeek={dayOfWeek}
              />
            );
          }}
        />
        <SectionWrapper>
          <Row
            withMarginBottom
          >
            <DefaultText
              color={appSyles.colors.textColor}
              withMarginRight
              weight={800}
            >
              Open At:
            </DefaultText>
            <DefaultText
              color={appSyles.colors.subText}
              weight={500}
            >
              {openAt}
            </DefaultText>
          </Row>
          <Row>
            <DefaultText
              color={appSyles.colors.textColor}
              withMarginRight
              weight={800}
            >
              Close At:
            </DefaultText>
            <DefaultText
              color={appSyles.colors.subText}
              weight={500}
            >
              {closeAt}
            </DefaultText>
          </Row>
        </SectionWrapper>
      </Fragment>
    );
  }
}

export default OperatingHours;
