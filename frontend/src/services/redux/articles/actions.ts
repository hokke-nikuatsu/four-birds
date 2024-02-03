import { FETCH_ARTICLES } from './types';
import { fetchArticlesData } from '../thunk/articles';

export const fetchArticles = (offset: number) =>
	fetchArticlesData(FETCH_ARTICLES, offset);
