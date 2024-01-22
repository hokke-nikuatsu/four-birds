import dotenv from 'dotenv';
import moment from 'moment-timezone';
import { type DBFetchNews } from '../types/db';
import { type FetchNewsResponse } from '../types/io';

dotenv.config();

export const loadEnvProperty = (property: string): string => {
	const value = process.env[property];
	if (!value) {
		throw new Error(`${value} is not defined in the environment variables.`);
	}

	return value;
};

const toCamelCase = (s: string): string =>
	s.replace(/_[a-z]/gi, (matched) => matched.charAt(1).toUpperCase());

type CamelCase<S extends string> = S extends `${infer P}_${infer C}${infer R}`
	? `${P}${Capitalize<C>}${CamelCase<R>}`
	: S;

export const convertToCamelCase = <T extends Record<string, unknown>>(
	obj: T,
): { [K in keyof T as CamelCase<K & string>]: T[K] } => {
	const newObj: Record<string, unknown> = {};
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const camelCaseKey = toCamelCase(key);
			newObj[camelCaseKey] = obj[key];
		}
	}
	return newObj as { [K in keyof T as CamelCase<K & string>]: T[K] };
};

export const convertToJapanTime = (
	date: Date,
): DBFetchNews[number]['publishedDate'] =>
	moment(date).tz('Asia/Tokyo').toDate();

export const trimText = (text: string) => {
	const maxLength = 300;

	if (text.length <= maxLength) {
		return text;
	}
	return `${text.substring(0, maxLength)}…`;
};

export const splitText = (text: string) => {
	const splittedText = text.split(',');

	return splittedText;
};

export const formatDate = (
	date: Date,
): FetchNewsResponse[number]['publishedDate'] =>
	moment(date).format('YYYY/MM/DD hh:mm');

export const capitalizeFirstLetter = (
	categories: DBFetchNews[number]['categories'][],
): DBFetchNews[number]['categories'][] => {
	const formattedCategories = categories.map((category: string) => {
		if (!category) return category;

		const formattedCategory =
			category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
		return formattedCategory;
	});

	return formattedCategories;
};
