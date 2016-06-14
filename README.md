Set up your reducer as follows:

```javascript
// reducers/index.jsx
import {combineReducers} from 'redux';
import {loadingReducer} from 'react-loading-component';

export default combineReducers({
  loading: loadingReducer
});
```

Design a component to appear when loading, usually a spinner with some text. It will have a prop passed to it called 'loadingText':

```javascript
// components/Loader.jsx
// This exact loader is available with:
// import {Loader} from 'react-loading-component'
var Loader = React.createClass({
  render: function() {
    var {loadingText} = this.props;
    return (
      <div>
        <span>{loadingText}</span>
      </div>
    );
  }
});
```

To give a component the ability to load, use the component generator LoadingComponent which takes two components as an argument: the original component, and the component to show when loading. Wrap and render your component (in this case 'Main') as follows:

```javascript
// app.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

var store = require('./store').configureStore();
import Main from './components/Main';

import {
  LoadingComponent
} from 'react-loading-component';


// You can initialise a LoadingComponent with an optional 3rd argument, which becomes its loadingId. With loadingIds (perhaps provided by an enumeration) you can easily control all LoadingComponents from anywhere that can dispatch actions.
var MainComponent = LoadingComponent(Main, Loader);

ReactDOM.render(
  <Provider store={store}>
    <MainComponent />
  </Provider>,
  document.getElementById('app')
);
```

Main will have two action generators passed to it as props: startLoading and endLoading. startLoading takes a string, which is passed to the loader object as a prop called loadingText:


```javascript
// components/Main.jsx
import React from 'react';
import {connect} from 'react-redux';

export var Main = React.createClass({
  doStartLoading: function() {
    var {startLoading, endLoading} = this.props;
    startLoading("I am loading!");
    setTimeout(function() {
      console.log("setTimeout: It's been one second!");
      endLoading();
    }, 1000);
  },
  render: function() {
    var {alerts, handleStartLoading} = this.props;

    return (
      <div>
        Hello!
        <button onClick={this.doStartLoading}>Start Loading</button>
      </div>
    );
  }
});

var mapAlertsToProps = (state) => {
  return {
    alerts: state.alerts
  }
}

module.exports = connect(mapAlertsToProps)(Main);
```
