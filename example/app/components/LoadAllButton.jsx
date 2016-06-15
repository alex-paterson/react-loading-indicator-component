import React from 'react';
import {connect} from 'react-redux';

import {startLoading, endLoading} from 'react-loading-indicator-component';
import {ALL_LOADER} from '../loaders';


export var LoadAllButton = React.createClass({
  doStartLoading: function() {
    var {dispatch} = this.props;
    dispatch(startLoading(ALL_LOADER, "All are loading!"));

    setTimeout(function() {
      console.log("setTimeout: It's been one second, stop loading!");
      dispatch(endLoading(ALL_LOADER));
    }, 1000);
  },
  render: function() {
    var {handleStartLoading} = this.props;

    return (
      <div>
        <br/>
        Load All!
        <button onClick={this.doStartLoading}>Start Loading</button>
      </div>
    );
  }
});

module.exports = connect()(LoadAllButton);
