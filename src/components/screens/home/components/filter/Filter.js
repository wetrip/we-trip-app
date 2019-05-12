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
    this.setState({
      type,
    });
  };

  onSetSliderRef = (ref: Object): void => {
    this._sliderRef = ref;
  };

  onResetFilter = (): void => {
    this._sliderRef.setNativeProps({ value: 1 });

    this.setState({
      ...INITIAL_STATE,
    });
  };

  onPressSearch = (): void => {
    console.tron.log(this.state);
  };

  onCloseFilter = (): void => {
    const { onToggleFilter } = this.props;

    this.setState(
      {
        ...INITIAL_STATE,
      },
      () => onToggleFilter(),
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
