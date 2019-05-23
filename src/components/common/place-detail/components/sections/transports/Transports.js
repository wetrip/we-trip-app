// @flow

import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '../../../../../../utils/CONSTANTS';
import TransportListItem from './TransportsListItem';
import TicketListItem from './TicketListItem';
import SectionTitle from '../../SectionTitle';

const List = styled(FlatList)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const Wrapper = styled(View)`
  margin-top: ${({ theme }) => 1.5 * theme.metrics.extraLargeSize}px;
`;

type Ticket = {
  isAccessible: boolean,
  stationName: string,
  description: string,
  isNocturne: boolean,
  isDiurnal: boolean,
  id: number,
};

type Transport = {
  transportTypeId: number,
  tickets: Array<Ticket>,
  price: string,
};

type Props = {
  transports: Array<Transport>,
};

type State = {
  indexTransportSelected: number,
};

class Transports extends PureComponent<Props, State> {
  state = {
    indexTransportSelected: 0,
  };

  onSelectItem = (indexSelected: number): void => {
    const { indexTransportSelected } = this.state;

    if (indexTransportSelected === indexSelected) {
      return;
    }

    this.setState({
      indexTransportSelected: indexSelected,
    });
  };

  renderTransportsList = (
    transports: Array<Transport>,
    indexTransportSelected: number,
  ): Object => (
    <List
      renderItem={({ item, index }) => {
        const { icon, label } = CONSTANTS.VALUES.TYPE_TRANSPORTS[
          item.transportTypeId
        ];

        return (
          <TransportListItem
            isSelected={index === indexTransportSelected}
            onSelectItem={() => this.onSelectItem(index)}
            isFirst={index === 0}
            label={label}
            icon={icon}
          />
        );
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item.transportTypeId}`}
      extraData={this.state}
      data={transports}
      horizontal
    />
  );

  renderTicketsList = (
    transports: Array<Transport>,
    indexTransportSelected: number,
  ): Object => {
    const { tickets, price } = transports[indexTransportSelected];

    return (
      <List
        renderItem={({ item }) => (
          <TicketListItem
            stationName={item.stationName}
            isAccessible={item.isAccessible}
            description={item.description}
            isNocturne={item.isNocturne}
            isDiurnal={item.isDiurnal}
            price={price}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        data={tickets}
      />
    );
  };

  render() {
    const { indexTransportSelected } = this.state;
    const { transports } = this.props;

    return (
      <Wrapper>
        <SectionTitle>Transports</SectionTitle>
        {this.renderTransportsList(transports, indexTransportSelected)}
        {this.renderTicketsList(transports, indexTransportSelected)}
      </Wrapper>
    );
  }
}

export default Transports;
