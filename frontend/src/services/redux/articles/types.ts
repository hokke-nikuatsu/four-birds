import { type NewsItem } from '../../../types/components';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';

export type ArticleState = NewsItem;

export type FetchArticles = {
	type: typeof FETCH_ARTICLES;
	payload: NewsItem[];
};

export type ArticlesActionTypes = FetchArticles;
