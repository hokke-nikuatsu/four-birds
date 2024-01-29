import {
	SIGN_IN_USER,
	SIGN_OUT_USER,
	type UserActionTypes,
	type UserState,
} from './types';

const initialState: UserState = {
	clientId: '',
};

export const userReducer = (state = initialState, action: UserActionTypes) => {
	console.log('action.type: ', action.type);
	switch (action.type) {
		case SIGN_IN_USER:
			return { clientId: action.payload.clientId };
		case SIGN_OUT_USER:
			return state;
		default:
			return state;
	}
};
