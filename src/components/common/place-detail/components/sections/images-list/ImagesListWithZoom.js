// @flow

import React, { Fragment } from 'react';
import {
  TouchableOpacity,
  Platform,
  Modal,
  StatusBar,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import styled from 'styled-components';

import appStyles from '../../../../../../styles';
import Icon from '../../../../Icon';

const FooterWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.width}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('16%')}px;
  justify-content: center;
  align-items: center;
  padding-top: ${({ theme }) => Platform.select({
    android: 0,
    ios: 4,
  })}px;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  background-color: ${({ theme }) => theme.colors.contrastColor};
`;

type Props = {
  onToggleModalImages: Function,
  indexImageSelected: number,
  isModalImagesOpen: boolean,
  images: Array<string>,
};

const ImagesListWithZoom = ({
  onToggleModalImages,
  indexImageSelected,
  isModalImagesOpen,
  images,
}: Props): Object => {
  const imagesWithURL = images.map(url => ({
    url,
  }));

  return (
    <Fragment>
      <StatusBar
        backgroundColor={appStyles.colors.black}
        barStyle="light-content"
      />
      <Modal
        visible={isModalImagesOpen}
        hardwareAccelerated
        transparent
      >
        <ImageViewer
          index={indexImageSelected}
          imageUrls={imagesWithURL}
          enableImageZoom
          renderFooter={() => (
            <FooterWrapper>
              <BackButton
                onPress={onToggleModalImages}
              >
                <Icon
                  name="arrow-left"
                  color={appStyles.colors.white}
                  size={32}
                />
              </BackButton>
            </FooterWrapper>
          )}
        />
      </Modal>
    </Fragment>
  );
};

export default ImagesListWithZoom;
