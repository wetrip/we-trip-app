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

type Image = {
  url: string,
};

type Props = {
  images: Array<Image>,
};

type State = {
  isModalImagesOpen: boolean,
  indexImageSelected: number,
};

class PlaceImagesList extends Component<Props, State> {
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
    const { images } = this.props;

    return (
      <Fragment>
        <ImagesList
          renderItem={({ item, index }) => (
            <PlaceImagesListItem
              onPressImage={() => this.onPressImage(index)}
              isFirst={index === 0}
              imageURL={item.url}
            />
          )}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.url}
          data={images}
          horizontal
        />
        {isModalImagesOpen && (
          <ImagesListWithZoom
            onToggleModalImages={this.onToggleModalImages}
            indexImageSelected={indexImageSelected}
            isModalImagesOpen={isModalImagesOpen}
            images={images}
          />
        )}
      </Fragment>
    );
  }
}

export default PlaceImagesList;
