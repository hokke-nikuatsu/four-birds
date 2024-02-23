export enum STATUS {
	ERROR = 'error',
	SUCCESS = 'success',
}

export type ApiResponse<T> = {
	status: STATUS;
	data?: T;
	message?: string;
};

export type FetchArticlesRequest = {
	offset: string;
};

export type FetchArticlesResponse = {
	articleId: string;
	title: string;
	description: string;
	publishedDate: string;
	url: string;
	ogpUrl: string;
	publisher_name: string;
	categories: string[];
}[];
