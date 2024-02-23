export enum STATUS {
	ERROR = 'error',
	SUCCESS = 'success',
}

export type User = {
	uid: string;
	displayName: string;
	email: string;
	photoUrl: string;
};

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

export type UpdateUserRequest = User;
