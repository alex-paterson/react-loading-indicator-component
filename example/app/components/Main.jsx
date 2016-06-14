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
