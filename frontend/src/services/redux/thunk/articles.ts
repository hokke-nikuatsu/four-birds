import { type Dispatch } from 'redux';
import { type FetchNewsResponse } from 'types/api';
import { fetchNews } from '../../../services/api/news';
import { type FETCH_ARTICLES } from '../articles/types';

export const fetchArticlesData =
	(type: typeof FETCH_ARTICLES, offset: number) =>
	async (dispatch: Dispatch): Promise<FetchNewsResponse> => {
		const articles = await fetchNews(offset);

		dispatch({ type, payload: articles });

		return articles;
	};
