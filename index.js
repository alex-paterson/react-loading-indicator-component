'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var loadingReducer = function loadingReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'START_LOADING':
      return _extends({}, state, _defineProperty({}, action.id, {
        isLoading: true,
        text: action.text
      }));

    case 'END_LOADING':
      return _extends({}, state, _defineProperty({}, action.id, {
        isLoading: false
      }));

    default:
      return state;
  }
};

var startLoading = function startLoading(id, text) {
  return {
    type: 'START_LOADING',
    id: id,
    text: text
  };
};

var _endLoading = function _endLoading(id) {
  return {
    type: 'END_LOADING',
    id: id
  };
};

var Loader = _react2.default.createClass({
  displayName: 'Loader',

  render: function render() {
    var loadingText = this.props.loadingText;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'span',
        null,
        loadingText
      )
    );
  }
});

var LoadingComponent = function LoadingComponent(ComposedComponent, Loader, loadingId) {
  var LoadingComponentClass = _react2.default.createClass({
    displayName: 'LoadingComponentClass',


    componentWillMount: function componentWillMount() {
      this.loadingId = loadingId ? loadingId : _nodeUuid2.default.v4();
    },

    handleStartLoading: function handleStartLoading() {
      var dispatch = this.props.dispatch;

      var object = startLoading(this.loadingId, "loadingText");
      dispatch(object);
    },
    endLoading: function endLoading(loadingText) {
      var dispatch = this.props.dispatch;

      dispatch(_endLoading(this.loadingId));
    },
    render: function render() {
      var loading = this.props.loading;

      var loadingId = this.loadingId;

      var passToChild = {
        startLoading: this.handleStartLoading,
        endLoading: this.endLoading,
        loadingId: loadingId
      };

      var alertObject = loading[loadingId];
      var isLoading = false;
      if (alertObject && alertObject.isLoading) {
        isLoading = true;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: !isLoading ? { display: 'none' } : {} },
          _react2.default.createElement(Loader, { loadingText: alertObject ? alertObject.text : "Loading..." })
        ),
        _react2.default.createElement(
          'div',
          { style: isLoading ? { display: 'none' } : {} },
          _react2.default.createElement(ComposedComponent, _extends({}, this.props, passToChild))
        )
      );
    }
  });

  function mapStateToProps(state) {
    return { loading: state.loading };
  }

  return (0, _reactRedux.connect)(mapStateToProps)(LoadingComponentClass);
};

module.exports = {
  default: LoadingComponent,
  LoadingComponent: LoadingComponent,
  loadingReducer: loadingReducer,
  startLoading: startLoading,
  endLoading: _endLoading,
  Loader: Loader
};