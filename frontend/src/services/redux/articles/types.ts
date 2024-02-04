import { type Article } from '../../../types/components';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';

export type ArticleState = Article;

export type FetchArticles = {
	type: typeof FETCH_ARTICLES;
	payload: Article[];
};

export type ArticlesActionTypes = FetchArticles;
