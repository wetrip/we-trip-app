// @flow

import React, { Component, Fragment } from 'react';
import { FlatList } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import styled from 'styled-components';

import ImagesListWithZoom from './ImagesListWithZoom';
import PlaceImagesListItem from './ImagesListItem';

const ImagesList = styled(FlatList)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  margin-bottom: ${({ theme }) => 1.5 * theme.metrics.extraLargeSize}px;
`;

const IMAGES = [
  {
    url:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/coco-bambu-sul.jpeg',
  },
  {
    url:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/misaki.jpeg',
  },
  {
    url:
      'https://s3-sa-east-1.amazonaws.com/bon-appetit-resources/restaurants/medium/cabana-riomar.jpeg',
  },
];

class PlaceImagesList extends Component {
  state = {
    isModalImagesOpen: false,
    indexImageSelected: 0,
  };

  onToggleModalImages = (): void => {
    const { isModalImagesOpen } = this.state;

    this.setState({
      isModalImagesOpen: !isModalImagesOpen,
    });
  };

  onPressImage = (indexImageSelected: number): void => {
    this.setState({
      isModalImagesOpen: true,
      indexImageSelected,
    });
  };

  render() {
    const { indexImageSelected, isModalImagesOpen } = this.state;

    return (
      <Fragment>
        <ImagesList
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.url}
          data={IMAGES}
          horizontal
          renderItem={({ item, index }) => (
            <PlaceImagesListItem
              onPressImage={() => this.onPressImage(index)}
              isFirst={index === 0}
              imageURL={item.url}
            />
          )}
        />
        {isModalImagesOpen && (
          <ImagesListWithZoom
            onToggleModalImages={this.onToggleModalImages}
            indexImageSelected={indexImageSelected}
            isModalImagesOpen={isModalImagesOpen}
            images={IMAGES}
          />
        )}
      </Fragment>
    );
  }
}

export default PlaceImagesList;
