import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

var store = require('./store').configureStore();

import {
  LoadingComponent,
  Loader
} from 'react-loading-indicator-component';
import {MAIN_LOADER, SECOND_MAIN_LOADER, ALL_LOADER} from './loaders';

import Main from './components/Main';
import SecondMain from './components/SecondMain';
import LoadAllButton from './components/LoadAllButton';

var MainComponent = LoadingComponent(Main, Loader, [MAIN_LOADER, ALL_LOADER]);
var SecondMainComponent = LoadingComponent(SecondMain, Loader, [SECOND_MAIN_LOADER, ALL_LOADER]);


ReactDOM.render(
  <Provider store={store}>
    <div>
      <MainComponent />
      <SecondMainComponent />
      <LoadAllButton />
    </div>
  </Provider>,
  document.getElementById('app')
);
