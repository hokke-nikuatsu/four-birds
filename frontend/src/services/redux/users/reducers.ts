import {
	SIGN_IN_USER,
	SIGN_OUT_USER,
	type UserActionTypes,
	type UserState,
} from './types';

const initialState: UserState = {
	uid: '',
	displayName: '',
	email: '',
	photoUrl: '',
};

export const userReducer = (state = initialState, action: UserActionTypes) => {
	switch (action.type) {
		case SIGN_IN_USER:
			return {
				uid: action.payload.uid,
				displayName: action.payload.displayName,
				email: action.payload.email,
				photoUrl: action.payload.photoUrl,
			};
		case SIGN_OUT_USER:
			return initialState;
		default:
			return state;
	}
};
