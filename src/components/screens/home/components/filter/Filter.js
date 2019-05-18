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
  maxRadiusSelected: number,
  price: string,
  type: string,
};

type Props = {
  onSearchWithFilter: Function,
  onToggleFilter: Function,
  isVisible: boolean,
};

const INITIAL_STATE = {
  maxRadiusSelected: 1,
  type: 'top_rated',
  categories: [],
  price: 'all',
};

class Filter extends Component<Props, State> {
  _sliderRef: Object = null;

  state = INITIAL_STATE;

  onSetMaxRadius = (maxRadiusSelected: number): void => {
    this._sliderRef.setNativeProps({ value: maxRadiusSelected });

    this.setState({
      maxRadiusSelected,
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
    const { maxRadiusSelected } = this.state;

    this.setState({
      maxRadiusSelected: type === 'nearby' ? null : maxRadiusSelected || 1,
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
      maxRadiusSelected, categories, price, type,
    } = this.state;

    const isMaxRadiusChanged = maxRadiusSelected !== INITIAL_STATE.maxRadiusSelected;
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
      maxRadiusSelected, categories, price, type,
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
            maxRadiusSelected={maxRadiusSelected}
            onSetSliderRef={this.onSetSliderRef}
            onSetMaxRadius={this.onSetMaxRadius}
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
