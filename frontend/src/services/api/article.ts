import {
	type FetchArticlesResponse,
	type ApiResponse,
	STATUS,
} from '../../types/api';
import { API_URL } from '../../utils/environment';

export const fetchArticles = async (
	articleCount: number,
): Promise<FetchArticlesResponse> => {
	try {
		const encodedUrl = encodeURI(`${API_URL}/article?offset=${articleCount}`);
		const response = await fetch(encodedUrl, {
			method: 'GET',
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const fetchArticlesResponse: ApiResponse<FetchArticlesResponse> =
			await response.json();

		if (
			fetchArticlesResponse.status !== STATUS.SUCCESS ||
			!fetchArticlesResponse.data
		) {
			throw fetchArticlesResponse;
		}

		const fetchArticlesResponseData = fetchArticlesResponse.data;

		return fetchArticlesResponseData;
	} catch (e) {
		console.error('Fetching articles failed:', JSON.stringify(e));
		throw e;
	}
};
