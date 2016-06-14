import {combineReducers} from 'redux';
import {loadingReducer} from 'react-loading-indicator-component';


export default combineReducers({
  loading: loadingReducer
});
