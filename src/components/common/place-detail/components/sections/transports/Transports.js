// @flow

import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import TransportListItem from './TransportsListItem';
import TicketListItem from './TicketListItem';
import SectionTitle from '../../SectionTitle';

const TRANSPORTS = [
  {
    label: 'Comboio',
    id: 'comboio',
    icon: 'train',
    tickets: Array(14)
      .fill({
        operatingHourStart: '05:00',
        operatingHourEnd: '18:00',
        destination: 'Destination Comboio 01',
        origin: 'Origin Comboio 01',
        title: 'First Comboio',
        price: 12.99,
      })
      .map((item, index) => ({ ...item, id: index })),
  },
  {
    label: 'Metro',
    id: 'metro',
    icon: 'subway',
    tickets: [
      {
        operatingHourStart: '15:00',
        operatingHourEnd: '00:00',
        destination: 'Destination Metro 01',
        origin: 'Origin Metro 01',
        title: 'First Metro',
        price: 2.99,
      },
    ],
  },
  {
    label: 'Eletrico',
    id: 'eletrico',
    icon: 'tram',
    tickets: [
      {
        operatingHourStart: '10:00',
        operatingHourEnd: '21:00',
        destination: 'Destination Eletrico 01',
        origin: 'Origin Eletrico 01',
        title: 'First Eletrico',
        price: 3.99,
      },
    ],
  },
  {
    label: 'Auto-Carro',
    id: 'auto-carro',
    icon: 'bus',
    tickets: [
      {
        operatingHourStart: '05:00',
        operatingHourEnd: '18:00',
        destination: 'Destination Auto-Carro 01',
        origin: 'Origin Auto-Carro 01',
        title: 'First Auto-Carro',
        price: 8.99,
      },
    ],
  },
  {
    label: 'Barca',
    id: 'barca',
    icon: 'ferry',
    tickets: [
      {
        operatingHourStart: '05:00',
        operatingHourEnd: '18:00',
        destination: 'Destination Barca 01',
        origin: 'Origin Barca 01',
        title: 'First Barca',
        price: 62.99,
      },
    ],
  },
];

const List = styled(FlatList)`
  margin-top: ${({ theme }) => theme.metrics.mediumSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
`;

const Wrapper = styled(View)`
  margin-top: ${({ theme }) => 1.5 * theme.metrics.extraLargeSize}px;
`;

class Transports extends PureComponent {
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

  renderTransportsList = (indexTransportSelected: number): Object => (
    <List
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item.id}`}
      extraData={this.state}
      data={TRANSPORTS}
      horizontal
      renderItem={({ item, index }) => (
        <TransportListItem
          isSelected={index === indexTransportSelected}
          onSelectItem={() => this.onSelectItem(index)}
          isFirst={index === 0}
          label={item.label}
          icon={item.icon}
        />
      )}
    />
  );

  renderTicketsList = (indexTransportSelected: number): Object => {
    const { tickets } = TRANSPORTS[indexTransportSelected];

    return (
      <List
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        data={tickets}
        renderItem={({ item }) => (
          <TicketListItem
            operatingHourStart={item.operatingHourStart}
            operatingHourEnd={item.operatingHourEnd}
            destination={item.destination}
            origin={item.origin}
            title={item.title}
            price={item.price}
          />
        )}
      />
    );
  };

  render() {
    const { indexTransportSelected } = this.state;

    return (
      <Wrapper>
        <SectionTitle>Transports</SectionTitle>
        {this.renderTransportsList(indexTransportSelected)}
        {this.renderTicketsList(indexTransportSelected)}
      </Wrapper>
    );
  }
}

export default Transports;
