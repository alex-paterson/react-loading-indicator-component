import React from 'react';
import {connect} from 'react-redux';

import {startLoading} from 'react-loading-indicator-component';
import {MAIN_LOADER} from '../loaders';


export var Main = React.createClass({
  doStartLoading: function() {
    var {endLoading} = this.props;

    // Two options for controlling LoadingComponents:

    // Use the startLoading method of the higher-order component, passed down
    // as a prop. This takes one argument: the loadingText.
    // var {startLoading} = this.props;
    // startLoading("I am loading!");


    // Alternatively, initialise LoadingComponents with ID's from an enumeration,
    // and manually dispatch actions from the action creator, startLoading, a function from the
    // react-loading-indicator-component library.
    var {dispatch} = this.props;
    dispatch(startLoading(MAIN_LOADER, "I am loading!"));

    setTimeout(function() {
      console.log("setTimeout: It's been one second, stop loading!");
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
