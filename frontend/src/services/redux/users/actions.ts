import { type User } from 'types/components';
import { SIGN_IN_USER, SIGN_OUT_USER } from './types';

export const signInUser = (user: User) => {
	console.log('通った？');
	return {
		type: SIGN_IN_USER,
		payload: user,
	};
};

export const signOutUser = () => ({
	type: SIGN_OUT_USER,
});
