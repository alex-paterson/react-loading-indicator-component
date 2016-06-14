import React, { Component } from 'react';
import {connect} from 'react-redux';
import uuid from 'node-uuid';




var loadingReducer = (state = {}, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        [action.id]: {
          isLoading: true,
          text: action.text
        }
      };

    case 'END_LOADING':
      return {
        ...state,
        [action.id]: {
          isLoading: false
        }
      };

    default:
      return state;
  }
}





var startLoading = (id, text) => {
  return {
    type: 'START_LOADING',
    id,
    text
  };
};

var stopLoading = (id) => {
  return {
    type: 'END_LOADING',
    id
  };
};





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



var LoadingComponent = function(ComposedComponent, Loader) {
  var LoadingComponentClass = React.createClass({

    componentWillMount: function() {
      this.alertId = uuid.v4();
    },

    handleStartLoading() {
      var {dispatch} = this.props;
      var object = startLoading(this.alertId, "loadingText");
      dispatch(object);
    },

    endLoading(loadingText) {
      var {dispatch} = this.props;
      dispatch(stopLoading(this.alertId));
    },

    render() {
      var {loading} = this.props;
      var alertId = this.alertId;

      var passToChild = {
        startLoading: this.handleStartLoading,
        endLoading: this.endLoading,
        alertId
      }

      var alertObject = loading[alertId];
      var isLoading = false;
      if (alertObject && alertObject.isLoading) {
        isLoading = true;
      }

      return (
        <div>
          <div style={!isLoading ? {display: 'none'} : {}}>
            <Loader loadingText={alertObject ? alertObject.text : "Loading..."}/>
          </div>
          <div style={isLoading ? {display: 'none'} : {}}>
            <ComposedComponent {...this.props} {...passToChild}/>
          </div>
        </div>
      )
    }
  });

  function mapStateToProps(state) {
    return { loading: state.loading };
  }

  return connect(mapStateToProps)(LoadingComponentClass);
}



module.exports = {
  default: LoadingComponent,
  LoadingComponent: LoadingComponent,
  loadingReducer: loadingReducer,
  Loader: Loader
}
