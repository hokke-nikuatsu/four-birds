// reducers.ts
import {
	type ArticleState,
	type ArticlesActionTypes,
	FETCH_ARTICLES,
} from './types';

const initialState: ArticleState[] = [];

export const articlesReducer = (
	state = initialState,
	action: ArticlesActionTypes,
): ArticleState[] => {
	switch (action.type) {
		case FETCH_ARTICLES:
			return [...state, ...action.payload];
		default:
			return state;
	}
};
