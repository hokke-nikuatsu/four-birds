export enum STATUS {
	ERROR = 'error',
	SUCCESS = 'success',
}

export type ApiResponse<T> = {
	status: 'success' | 'error';
	data?: T;
	message?: string;
};

export type FetchNewsRequest = {
	offset: string;
};

export type FetchNewsResponse = {
	articleId: string;
	title: string;
	description: string;
	publishedDate: string;
	url: string;
	ogpUrl: string;
	publisher_name: string;
	categories: string[];
}[];
