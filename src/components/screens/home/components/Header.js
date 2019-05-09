// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity, Platform, View, Text,
} from 'react-native';
import styled from 'styled-components';

import CONSTANTS from '../../../../utils/CONSTANTS';
import SearchPlaceTextInput from './SearchPlaceTextInput';
import appStyles from '../../../../styles';
import Icon from '../../../common/Icon';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: ${Platform.OS == 'ios' ? 20 : 0}px;
`;

type State = {
  placeName: string,
};

type Props = {
  navigation: Object,
};

class Header extends Component<Props, State> {
  state = {
    indexIconSelected: 0,
    placeName: '',
  };

  onTypePlaceName = (placeName: string): void => {
    this.setState({
      placeName,
    });
  };

  onPressIconButton = (): void => {
    const { indexIconSelected } = this.state;
    const { navigation } = this.props;
    const { params } = navigation.state;

    const onChooseScreenType = params[CONSTANTS.PARAMS.CHANGE_HOME_SCREEN_TYPE];
    const newIndex = indexIconSelected === 0 ? 1 : 0;

    this.setState(
      {
        indexIconSelected: newIndex,
      },
      () => onChooseScreenType(newIndex),
    );
  };

  renderButtonWithIcon = (
    iconName: string,
    onPressButtonIcon: Function,
  ): Object => (
    <TouchableOpacity
      onPress={onPressButtonIcon}
    >
      <Icon
        color={appStyles.colors.textColor}
        name={iconName}
        size={28}
      />
    </TouchableOpacity>
  );

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;

    if (!params) {
      return null;
    }

    const { indexIconSelected, placeName } = this.state;

    const leftIconName = indexIconSelected === 0 ? 'map' : 'format-list-bulleted';

    const onToggleDarkLayer = params[CONSTANTS.PARAMS.ON_TOGGLE_DARK_LAYER];
    const onSearchPlaces = params[CONSTANTS.PARAMS.ON_SEARCH_PLACE];
    const onToggleFilter = params[CONSTANTS.PARAMS.TOGGLE_FILTER];

    return (
      <Wrapper>
        {this.renderButtonWithIcon(leftIconName, this.onPressIconButton)}
        <SearchPlaceTextInput
          onSearchPlace={() => onSearchPlaces(placeName)}
          onTypePlaceName={this.onTypePlaceName}
          onToggleDarkLayer={onToggleDarkLayer}
        />
        {this.renderButtonWithIcon('filter-variant', onToggleFilter)}
      </Wrapper>
    );
  }
}

export default Header;
