import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import authReducer from './authReducer';
import registerReducer from './registerReducer';
import profileReducer from './profileReducer';
import tournamentReducer from './tournamentReducer';

export default combineReducers({
  mainReducer, authReducer, registerReducer, profileReducer, tournamentReducer,
});
