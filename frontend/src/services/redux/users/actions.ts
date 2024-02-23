import { type User } from 'types/components';
import { SIGN_IN_USER, SIGN_OUT_USER } from './types';
import { updateUserData } from '../thunk/users';

export const updateUser = (user: User) => updateUserData(SIGN_IN_USER, user);

export const signOutUser = () => ({
	type: SIGN_OUT_USER,
});
