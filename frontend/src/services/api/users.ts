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

export const generateCsrfToken = async (
	user: User,
): Promise<ApiResponse<void>> => {
	try {
		const response = await fetch(`${API_URL}/user/${user.uid}`, {
			method: 'GET',
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const generateCsrfTokenResponse: ApiResponse<void> = await response.json();

		if (generateCsrfTokenResponse.status !== STATUS.SUCCESS) {
			throw generateCsrfTokenResponse;
		}

		return generateCsrfTokenResponse;
	} catch (e) {
		console.error('Generate CSRF token failed:', JSON.stringify(e));

		throw e;
	}
};

export const deleteCsrfToken = async (user: User): Promise<void> => {
	try {
		const response = await fetch(`${API_URL}/user/${user.uid}`, {
			method: 'DELETE',
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const deleteTokenResponse: ApiResponse<void> = await response.json();

		if (deleteTokenResponse.status !== STATUS.SUCCESS) {
			throw deleteTokenResponse;
		}
	} catch (e) {
		console.error('Delete CSRF token failed:', JSON.stringify(e));

		throw e;
	}
};
