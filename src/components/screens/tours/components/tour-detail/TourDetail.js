// @flow

import React, { Component, Fragment } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '../../../../../utils/CONSTANTS';
import appStyles from '../../../../../styles';
import TourList from './ToursList';
import Header from './Header';

const PLACES = [
  {
    location: {
      latitude: -3.8406333,
      longitude: -38.5606571,
    },
    isOpen: true,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/coco-bambu-sul.jpeg',
    name: 'Stenio Wagner Pereira de Freitas Stenio Wagner Pereira de Freitas',
    distanceToUser: 4,
    id: 1,
  },
  {
    location: {
      latitude: -3.7273013,
      longitude: -38.5897033,
    },
    isOpen: false,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/misaki.jpeg',
    distanceToUser: 1.1,
    name: 'Place 02',
    id: 2,
  },
  {
    location: {
      latitude: -3.7451878,
      longitude: -38.5736122,
    },
    isOpen: true,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/cabana-riomar.jpeg',
    distanceToUser: 3.7,
    name: 'Place 03',
    id: 3,
  },
  {
    location: {
      latitude: -3.8406333,
      longitude: -38.5606571,
    },
    isOpen: true,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/coco-bambu-sul.jpeg',
    name: 'Place 01',
    distanceToUser: 4,
    id: 12,
  },
  {
    location: {
      latitude: -3.7273013,
      longitude: -38.5897033,
    },
    isOpen: false,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/misaki.jpeg',
    distanceToUser: 1.1,
    name: 'Place 02',
    id: 22,
  },
  {
    location: {
      latitude: -3.7451878,
      longitude: -38.5736122,
    },
    isOpen: true,
    imageURL:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/cabana-riomar.jpeg',
    distanceToUser: 3.7,
    name: 'Place 03',
    id: 23,
  },
];

const ContentWrapper = styled(ScrollView)`
  flex: 1;
`;

class TourDetail extends Component {
  _containerLisRef: Object = null;

  state = {
    indexScreenSelected: 0,
  };

  onChooseScreenIndex = (index: number): void => {
    this.setState(
      {
        indexScreenSelected: index,
      },
      () => {
        this._containerLisRef.scrollTo({
          x: this.state.indexScreenSelected * appStyles.metrics.width,
          y: 0,
          animated: true,
        });
      },
    );
  };

  onSelectPlace = (placeId: number): void => {
    const { navigation } = this.props;

    navigation.navigate(CONSTANTS.ROUTES.PLACE_DETAIL, {
      [CONSTANTS.PARAMS.PLACE_ID]: placeId,
    });
  };

  render() {
    return (
      <Fragment>
        <Header />
        <ContentWrapper
          ref={(ref: any): void => {
            _containerLisRef = ref;
          }}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          pagingEnabled
          horizontal
        >
          <TourList
            onSelectPlace={this.onSelectPlace}
            places={PLACES}
          />
        </ContentWrapper>
      </Fragment>
    );
  }
}

export default TourDetail;
