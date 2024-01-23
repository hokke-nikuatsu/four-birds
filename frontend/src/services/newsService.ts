import { type FetchNewsResponse, type ApiResponse, STATUS } from '../types/api';
import { API_URL } from '../utils/environment';

export const fetchNews = async (
	newsCount: number,
): Promise<FetchNewsResponse> => {
	try {
		const response = await fetch(`${API_URL}/news?offset=${newsCount}`);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const fetchNewsResponse: ApiResponse<FetchNewsResponse> =
			await response.json();

		if (
			fetchNewsResponse.status !== STATUS.SUCCESS ||
			!fetchNewsResponse.data
		) {
			throw fetchNewsResponse;
		}

		return fetchNewsResponse.data;
	} catch (e) {
		console.error('Fetching news failed:', e);
		throw e;
	}
};
