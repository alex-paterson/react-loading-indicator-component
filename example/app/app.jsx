import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

var store = require('./store').configureStore();
import Main from './components/Main';

import {
  LoadingComponent,
  Loader
} from 'react-loading-indicator-component';


var MainComponent = LoadingComponent(Main, Loader);

ReactDOM.render(
  <Provider store={store}>
    <MainComponent />
  </Provider>,
  document.getElementById('app')
);
