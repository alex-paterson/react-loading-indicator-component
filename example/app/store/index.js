import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';


export var configureStore = (initialState = {}) => {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
  return store;
};
