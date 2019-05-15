// @flow

import React, { Component } from 'react';
import ToursComponent from './components/ToursComponent';

const TOUR = {
  title: 'Knowing the Coast',
  description:
    'Wander through the wonderful portuguese beaches and learn more about the history of the the most powerful navy in Europe.',
  imageURL:
    'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/coco-bambu-sul.jpeg',
  destinations: [
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
      id: '1',
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
      id: '2',
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
      id: '3',
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
      id: '12',
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
      id: '22',
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
      id: '23',
    },
  ],
};

const TOURS = Array(6)
  .fill(TOUR)
  .map((item, index) => ({
    ...item,
    id: index,
  }));

class ToursContainer extends Component {
  onSelectTour = (tourId: number): void => {
    console.tron.log(tourId);
  };

  render() {
    return <ToursComponent
      onSelectTour={this.onSelectTour}
      tours={TOURS}
    />;
  }
}

export default ToursContainer;
