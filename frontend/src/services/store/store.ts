import { useDispatch } from 'react-redux';
import { type Action, applyMiddleware, compose, createStore } from 'redux';
import { type ThunkDispatch, thunk } from 'redux-thunk';
import { ENV } from '../../utils/environment';
import { reducers } from '../redux/rootReducer';

const shouldDisableDevTools = ENV === 'production';

const middleware = [thunk];

const composeEnhancers =
	(!shouldDisableDevTools && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

export const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(...middleware)),
);

export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = ThunkDispatch<AppState, unknown, Action>;
export const useAppDispatch: () => AppDispatch = useDispatch;
