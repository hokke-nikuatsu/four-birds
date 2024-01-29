import { combineReducers } from 'redux';
import { userReducer } from './users/reducers';

export const reducers = combineReducers({
	user: userReducer,
});
