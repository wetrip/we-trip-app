// @flow

import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '../../../../../../utils/CONSTANTS';
import TransportListItem from './TransportsListItem';
import TicketListItem from './TicketListItem';
import SectionTitle from '../../SectionTitle';

const TRANSPORTS = [
  {
    transportTypeId: 1,
    price: '3,99 €',
    tickets: [
      {
        id: 1,
        stationName: 'Carnide',
        description: 'Blue Line',
        isDiurnal: true,
        isNocturne: false,
        isAccessible: true,
      },
      {
        id: 2,
        stationName: 'Lumiar',
        description: 'Yellow Line',
        isDiurnal: false,
        isNocturne: true,
        isAccessible: true,
      },
    ],
  },
  {
    transportTypeId: 2,
    price: '2,99 €',
    tickets: [
      {
        id: 3,
        stationName: 'Moscavide',
        description: 'Red Line',
        isDiurnal: false,
        isNocturne: true,
        isAccessible: true,
      },
    ],
  },
  {
    transportTypeId: 3,
    price: '3,99 €',
    tickets: [
      {
        id: 1,
        stationName: 'Rossio',
        description: 'Green Line',
        isDiurnal: true,
        isNocturne: false,
        isAccessible: true,
      },
      {
        id: 2,
        stationName: 'Reboleira',
        description: 'Blue Line',
        isDiurnal: true,
        isNocturne: false,
        isAccessible: true,
      },
    ],
  },
  {
    transportTypeId: 4,
    price: '8,99 €',
    tickets: [
      {
        id: 1,
        stationName: 'Anjos',
        isDiurnal: false,
        isNocturne: true,
        description: 'Green Line',
        isAccessible: true,
      },
      {
        id: 2,
        stationName: 'Be',
        description: 'Green Line',
        isDiurnal: false,
        isNocturne: true,
        isAccessible: false,
      },
    ],
  },
  {
    transportTypeId: 5,
    price: '62,99 €',
    tickets: [
      {
        id: 1,
        stationName: 'Lumiar',
        description: 'Yellow Line',
        isAccessible: false,
        isDiurnal: true,
        isNocturne: false,
      },
      {
        id: 2,
        stationName: 'Praça de Espanha',
        description: 'Blue Line',
        isAccessible: true,
        isDiurnal: false,
        isNocturne: true,
      },
      {
        id: 3,
        stationName: 'Picoas',
        description: 'Yellow Line',
        isAccessible: false,
        isDiurnal: true,
        isNocturne: false,
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
      keyExtractor={item => `${item.transportTypeId}`}
      extraData={this.state}
      data={TRANSPORTS}
      horizontal
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
    />
  );

  renderTicketsList = (indexTransportSelected: number): Object => {
    const { tickets, price } = TRANSPORTS[indexTransportSelected];

    return (
      <List
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        data={tickets}
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
