// @flow

import React, { Component } from 'react';
import { Modal, ScrollView } from 'react-native';
import styled from 'styled-components';

import MaxRadiusSearchSection from './sections/MaxRadiusSearch';
import CategoriesSection from './sections/Categories';
import PriceSection from './sections/Price';
import TypeSection from './sections/Type';
import SearchButton from './SearchButton';

import Header from './Header';

const Container = styled(ScrollView)`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

type State = {
  categories: Array<string>,
  maxRadius: number,
  price: string,
  type: string,
};

type Props = {
  onSearchWithFilter: Function,
  onToggleFilter: Function,
  isVisible: boolean,
};

const INITIAL_STATE = {
  type: 'top_rated',
  categories: [],
  maxRadius: 1,
  price: 'all',
};

class Filter extends Component<Props, State> {
  _sliderRef: Object = null;

  state = INITIAL_STATE;

  onSetMaxRadius = (maxRadius: number): void => {
    this._sliderRef.setNativeProps({ value: maxRadius });

    this.setState({
      maxRadius,
    });
  };

  onSetCategory = (category: string): void => {
    const { categories } = this.state;
    let newCategories = [category, ...categories];

    const alreadyHasCategory = categories.includes(category);

    if (alreadyHasCategory) {
      newCategories = categories.filter(item => item !== category);
    }

    this.setState({
      categories: newCategories,
    });
  };

  onSetPrice = (price: string): void => {
    this.setState({
      price,
    });
  };

  onSetType = (type: string): void => {
    const { maxRadius } = this.state;

    this.setState({
      maxRadius: type === 'nearby' ? null : maxRadius || 1,
      type,
    });
  };

  onSetSliderRef = (ref: Object): void => {
    this._sliderRef = ref;
  };

  onResetFilter = (): void => {
    const shouldAllowResetFilter = this.checkStateChanged();

    if (!shouldAllowResetFilter) {
      return;
    }

    this._sliderRef.setNativeProps({ value: 1 });

    this.setState({
      ...INITIAL_STATE,
    });
  };

  onPressSearch = (): void => {
    const { onSearchWithFilter } = this.props;

    onSearchWithFilter(this.state);
  };

  onCloseFilter = (): void => {
    const { onToggleFilter } = this.props;

    onToggleFilter();
  };

  checkStateChanged = (): boolean => {
    const {
      maxRadius, categories, price, type,
    } = this.state;

    const isMaxRadiusChanged = maxRadius !== INITIAL_STATE.maxRadius;
    const isPriceChanged = price !== INITIAL_STATE.price;
    const isTypeChanged = type !== INITIAL_STATE.type;
    const isCategoriesChanged = categories.length > 0;

    return (
      isMaxRadiusChanged
      || isPriceChanged
      || isTypeChanged
      || isCategoriesChanged
    );
  };

  render() {
    const {
      maxRadius, categories, price, type,
    } = this.state;

    const shouldDisableMaximumRadiusSearch = type === 'nearby';

    const { onToggleFilter, isVisible } = this.props;

    return (
      <Modal
        animationType="slide"
        visible={isVisible}
        hardwareAccelerated
      >
        <Header
          onCloseFilter={this.onCloseFilter}
          onResetFilter={this.onResetFilter}
        />
        <Container
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          <TypeSection
            onSetType={this.onSetType}
            typeSelected={type}
          />
          <PriceSection
            onSetPrice={this.onSetPrice}
            priceSelected={price}
          />
          <MaxRadiusSearchSection
            shouldDisableMaximumRadiusSearch={shouldDisableMaximumRadiusSearch}
            onSetSliderRef={this.onSetSliderRef}
            onSetMaxRadius={this.onSetMaxRadius}
            maxRadius={maxRadius}
          />
          <CategoriesSection
            onSetCategory={this.onSetCategory}
            categories={categories}
          />
          <SearchButton
            onPressSearch={this.onPressSearch}
          />
        </Container>
      </Modal>
    );
  }
}

export default Filter;
