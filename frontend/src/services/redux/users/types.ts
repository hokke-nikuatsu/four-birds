import { type User } from '../../../types/components';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

export type UserState = User;

export type SignInUser = {
	type: typeof SIGN_IN_USER;
	payload: User;
};

export type SignOutUser = {
	type: typeof SIGN_OUT_USER;
};

export type UserActionTypes = SignInUser | SignOutUser;
