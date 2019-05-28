// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity, Platform, Keyboard, View, Text,
} from 'react-native';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlaceCreators } from '../../../../store/ducks/places';

import isEqualsOrLargestThanIphoneX from '../../../../utils/isEqualsOrLargestThanIphoneX';
import SearchPlaceTextInput from './SearchPlaceTextInput';
import CONSTANTS from '../../../../utils/CONSTANTS';
import appStyles from '../../../../styles';
import Icon from '../../../common/Icon';

const Wrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: ${Platform.OS === 'ios'
    ? isEqualsOrLargestThanIphoneX()
      ? 30
      : 20
    : 0}px;
`;

type State = {
  placeName: string,
};

type Props = {
  navigation: Object,
  loading: boolean,
  error: boolean,
};

class Header extends Component<Props, State> {
  _inputRef: Object = null;

  state = {
    isInputFocused: false,
    indexIconSelected: 0,
    placeName: '',
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      this._keyboardWillHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          this.handleInputFocus(false);
          this._inputRef.blur();
        },
      );
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { navigation } = nextProps;
    const { params } = navigation.state;
    const { placeName } = this.state;

    if (params[CONSTANTS.PARAMS.SHOULD_RESET_SEARCH_INPUT] && placeName) {
      this._inputRef.clear();
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this._keyboardWillHideListener.remove();
    }
  }

  onTypePlaceName = (placeName: string): void => {
    this.setState({
      placeName,
    });
  };

  getItemFromNavigationProps = (id: string): Function => {
    const { navigation } = this.props;
    const { params } = navigation.state;

    return params[id];
  };

  onPressIconButton = (): void => {
    const { indexIconSelected, isInputFocused } = this.state;
    const { loading, error } = this.props;

    if (isInputFocused || loading || error) {
      return;
    }

    const newIndex = indexIconSelected === 0 ? 1 : 0;

    const onChooseScreenType = this.getItemFromNavigationProps(
      CONSTANTS.PARAMS.CHANGE_HOME_SCREEN_TYPE,
    );

    this.setState(
      {
        indexIconSelected: newIndex,
      },
      () => onChooseScreenType(newIndex),
    );
  };

  handleInputFocus = (isFocused: boolean): void => {
    const onToggleDarkLayer = this.getItemFromNavigationProps(
      CONSTANTS.PARAMS.ON_TOGGLE_DARK_LAYER,
    );

    this.setState({
      isInputFocused: isFocused,
    });

    onToggleDarkLayer(isFocused);
  };

  handleSearch = (): void => {
    const onSearchPlaces = this.getItemFromNavigationProps(
      CONSTANTS.PARAMS.ON_SEARCH_PLACE,
    );

    const { placeName } = this.state;

    if (placeName) {
      onSearchPlaces(placeName);
    }
  };

  onPressFilter = (): void => {
    const { isInputFocused } = this.state;

    const onToggleFilter = this.getItemFromNavigationProps(
      CONSTANTS.PARAMS.TOGGLE_FILTER,
    );

    if (!isInputFocused) {
      onToggleFilter();
    }
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

    const { indexIconSelected } = this.state;
    const leftIconName = indexIconSelected === 0 ? 'map' : 'format-list-bulleted';

    return (
      <Wrapper>
        {this.renderButtonWithIcon(leftIconName, this.onPressIconButton)}
        <SearchPlaceTextInput
          handleInputFocus={this.handleInputFocus}
          onTypePlaceName={this.onTypePlaceName}
          onSearchPlace={this.handleSearch}
          onSetInputRef={(ref) => {
            this._inputRef = ref;
          }}
        />
        {this.renderButtonWithIcon('filter-variant', this.onPressFilter)}
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PlaceCreators, dispatch);

const mapStateToProps = state => ({
  loading: state.places.loading,
  error: state.places.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);