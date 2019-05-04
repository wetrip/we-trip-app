// @flow

import React, { Fragment } from 'react';
import { StatusBar, Platform } from 'react-native';

import { ThemeProvider } from 'styled-components';

import './config/ReactotronConfig';

import ApplicationNavigator from './routes';
import appStyles from './styles';

const App = (): Object => (
  <Fragment>
    <StatusBar
      backgroundColor={appStyles.colors.androidToolbarColor}
      barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
    />
    <ThemeProvider
      theme={appStyles}
    >
      <ApplicationNavigator />
    </ThemeProvider>
  </Fragment>
);

export default App;
