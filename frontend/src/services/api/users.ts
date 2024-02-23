import { STATUS, type ApiResponse } from '../../types/api';
import { type User } from '../../types/components';
import { API_URL } from '../../utils/environment';

export const updateUser = async (user: User): Promise<ApiResponse<void>> => {
	try {
		const response = await fetch(`${API_URL}/user/${user.uid}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
			},
			credentials: 'include',
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const updateUserResponse: ApiResponse<void> = await response.json();

		if (updateUserResponse.status !== STATUS.SUCCESS) {
			throw updateUserResponse;
		}

		return updateUserResponse;
	} catch (e) {
		console.error('Update user failed:', JSON.stringify(e));

		throw e;
	}
};

