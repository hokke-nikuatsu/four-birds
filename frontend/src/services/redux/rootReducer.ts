import { combineReducers } from 'redux';
import { articlesReducer } from './articles/reducers';
import { userReducer } from './users/reducers';

export const reducers = combineReducers({
	user: userReducer,
	articles: articlesReducer,
});
