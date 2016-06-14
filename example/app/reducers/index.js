import {combineReducers} from 'redux';
import {loadingReducer} from 'react-loading-component';


export default combineReducers({
  loading: loadingReducer
});
