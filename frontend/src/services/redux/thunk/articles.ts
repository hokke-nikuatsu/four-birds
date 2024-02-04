import { type Dispatch } from 'redux';
import { type FetchArticlesResponse } from 'types/api';
import { fetchArticles } from '../../api/article';
import { type FETCH_ARTICLES } from '../articles/types';

export const fetchArticlesData =
	(type: typeof FETCH_ARTICLES, offset: number) =>
	async (dispatch: Dispatch): Promise<FetchArticlesResponse> => {
		const articles = await fetchArticles(offset);

		dispatch({ type, payload: articles });

		return articles;
	};
