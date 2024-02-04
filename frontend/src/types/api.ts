export enum STATUS {
	ERROR = 'error',
	SUCCESS = 'success',
}

export type ApiResponse<T> = {
	status: 'success' | 'error';
	data?: T;
	message?: string;
};

export type FetchArticlesResponse = {
	articleId: string;
	title: string;
	description: string;
	publishedDate: string;
	url: string;
	ogpUrl: string;
	publisherName: string;
	categories: string[];
}[];
