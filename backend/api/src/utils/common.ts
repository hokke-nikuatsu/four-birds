import dotenv from 'dotenv';

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
