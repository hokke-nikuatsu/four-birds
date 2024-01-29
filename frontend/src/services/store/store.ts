import { compose, createStore } from 'redux';
import { ENV } from '../../utils/environment';
import { reducers } from '../redux/rootReducer';

const shouldDisableDevTools = ENV === 'production';

const composeEnhancers =
	(!shouldDisableDevTools && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

export const store = createStore(reducers, composeEnhancers());
