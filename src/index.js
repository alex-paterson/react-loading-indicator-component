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

var endLoading = (id) => {
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



var intersectionOfArrays = function(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });
}




var LoadingComponent = function(ComposedComponent, Loader, loadingIdArray) {
  var LoadingComponentClass = React.createClass({

    componentWillMount: function() {
      var loadingId = uuid.v4()
      this.loadingId = loadingId;
      this.loadingIdArray = loadingIdArray ? [loadingId, ...loadingIdArray] : [loadingId];
    },

    handleStartLoading(loadingText) {
      var {dispatch} = this.props;
      var object = startLoading(this.loadingId, loadingText);
      dispatch(object);
    },

    endLoading(loadId) {
      var {dispatch} = this.props;
      dispatch(endLoading(loadId ? loadId : this.loadingId));
    },

    render() {
      var {loading} = this.props;
      var {loadingId, loadingIdArray} = this;

      var passToChild = {
        startLoading: this.handleStartLoading,
        endLoading: this.endLoading,
        loadingIdArray,
        loadingId
      }

      var loadingObject;
      loadingIdArray.forEach((id) => {
        var loadObj = loading[id];
        if (loadObj && loadObj.isLoading) {
          loadingObject = loadObj;
          return true;
        } else {
          return false;
        }
      });

      var isLoading = false;
      if (loadingObject && loadingObject.isLoading) {
        isLoading = true;
      }

      return (
        <div style={{width: '100%'}}>
          <div style={!isLoading ? {display: 'none'} : {}}>
            <Loader loadingText={loadingObject ? loadingObject.text : "Loading..."}/>
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
  LoadingComponent,
  loadingReducer,
  startLoading,
  endLoading,
  Loader
}
