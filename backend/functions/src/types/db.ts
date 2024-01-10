export const DESCRIPTION_MAXIMUM_LENGTH = 300;

export type DBArticle = {
	articleId: string;
	title: string;
	description: string;
	publishedDate: Date;
	url: string;
	ogpUrl: string;
	publisherId: number;
	isValid: boolean;
	createdAt: Date;
	updatedAt?: Date;
};

export type DBPublisher = {
	publisherId: number;
	name: string;
	displayName?: string;
	url?: string;
	createdAt: Date;
	updatedAt?: Date;
};

export type DBInsertPublisher = Omit<DBPublisher, 'publisherId'>;

export type DBCategory = {
	categoryId: number;
	name: string;
	japaneseName?: string;
	createdAt: Date;
	updatedAt?: Date;
};

export type DBInsertCategory = Omit<DBCategory, 'categoryId'>;

export type DBCountry = {
	countryId: number;
	name: string;
	japaneseName: string;
	createdAt: Date;
	updatedAt?: Date;
};

export type DBInsertCountry = Omit<DBCountry, 'countryId' | 'japaneseName'>;

export type DBArticleCategory = {
	articleId: string;
	categoryId: number;
	createdAt: Date;
	updatedAt?: Date;
};

export type DBArticleCountry = {
	articleId: string;
	countryId: number;
	createdAt: Date;
	updatedAt?: Date;
};

export type DBNewsFetchLog = {
	newsFetchLogId: number;
	newsCount: number;
	executedDate: Date;
	status: boolean;
	createdAt: Date;
	updatedAt?: Date;
};

export type DBInsertNewsFetchLog = Omit<DBNewsFetchLog, 'newsFetchLogId'>;
