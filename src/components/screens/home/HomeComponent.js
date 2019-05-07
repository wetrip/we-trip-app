// @flow

import React, { Fragment, Component } from 'react';
import { View } from 'react-native';

import CONSTANTS from '../../../utils/CONSTANTS';
import HomeComponent from './components/HomeComponent';

class HomeContainer extends Component {
  _flatListRef: Object = {};

  state = {
    shouldShowDarkLayer: false,
    indexScreenSelected: 0,
    isFilterOpen: false,
  };

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      [CONSTANTS.PARAMS.CHANGE_HOME_SCREEN_TYPE]: this.onChooseScreenIndex,
      [CONSTANTS.PARAMS.ON_TOGGLE_DARK_LAYER]: this.onToggleDarkLayer,
      [CONSTANTS.PARAMS.ON_SEARCH_PLACE]: place => console.tron.log(place),
      [CONSTANTS.PARAMS.TOGGLE_FILTER]: this.onToggleFilter,
    });
  }

  onToggleDarkLayer = (shouldShowDarkLayer: boolean): void => {
    this.setState({
      shouldShowDarkLayer,
    });
  };

  onToggleFilter = (): void => {
    const { isFilterOpen } = this.state;

    this.setState({
      isFilterOpen: !isFilterOpen,
    });

    console.tron.log('onToggleFilter');
  };

  onChooseScreenIndex = (index: number): void => {
    this.setState(
      {
        indexScreenSelected: index,
      },
      () => this._flatListRef.scrollToIndex({ animated: true, index }),
    );
  };

  onSetFlatListRef = (ref: Object): void => {
    this._flatListRef = ref;
  };

  render() {
    const { shouldShowDarkLayer } = this.state;

    return (
      <HomeComponent
        shouldShowDarkLayer={shouldShowDarkLayer}
        onSetFlatListRef={this.onSetFlatListRef}
      />
    );
  }
}

export default HomeContainer;
