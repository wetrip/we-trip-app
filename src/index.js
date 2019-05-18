// @flow

import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import { ThemeProvider } from 'styled-components';

import ApplicationNavigator from './routes';
import appStyles from './styles';
import store from './store';

const App = (): Object => (
  <Provider
    store={store}
  >
    <Fragment>
      <StatusBar
        backgroundColor={appStyles.colors.androidToolbarColor}
        barStyle="dark-content"
      />
      <ThemeProvider
        theme={appStyles}
      >
        <ApplicationNavigator />
      </ThemeProvider>
    </Fragment>
  </Provider>
);

export default App;
