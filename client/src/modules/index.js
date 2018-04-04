import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loader from './loader';

export default combineReducers({
  router: routerReducer,
  loader
});
