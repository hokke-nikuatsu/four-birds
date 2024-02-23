import { type Dispatch } from 'redux';
import { updateUser } from '../../../services/api/users';
import { type User } from '../../../types/components';
import { type SIGN_IN_USER } from '../users/types';

export const updateUserData =
	(type: typeof SIGN_IN_USER, user: User) =>
	async (dispatch: Dispatch): Promise<void> => {
		await updateUser(user);

		dispatch({ type, payload: user });
	};
