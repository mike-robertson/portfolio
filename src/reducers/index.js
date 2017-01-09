import { combineReducers } from 'redux';
import fsg from 'reducers/fsg';
import navbar from 'reducers/navbar';

export default combineReducers({
  fsg,
  navbar,
});
