import dotenv from 'dotenv';

dotenv.config();

export const API_HEALTH_CHECK_URL =
	'https://four-birds-backend.onrender.com/api/health-check';
export const RUNTIME_MEMORY_SIZE = '256MB';
export const RUNTIME_TIMEOUT_SECOUNDS = 540;

export const loadEnvProperty = (property: string): string => {
	const value = process.env[property];
	if (!value) {
		throw new Error(`${value} is not defined in the environment variables.`);
	}

	return value;
};

export const trimAfterSpecialSymbols = (str: string | null): string => {
	if (str) {
		const indexOfSymbol = str.search(/\[…]|…|©| <FULL STORY>/);

		if (indexOfSymbol !== -1) {
			return str.substring(0, indexOfSymbol);
		}

		return str;
	}

	return '';
};

export const shortenSentence = (
	str: string | null,
	maximumLength: number,
): string => {
	if (!str || str.length <= maximumLength) {
		return str ?? '';
	}

	const lastSpaceIndex = str.substring(0, maximumLength).lastIndexOf(' ');
	const shortenedSentence =
		lastSpaceIndex > 0
			? str.substring(0, lastSpaceIndex)
			: str.substring(0, maximumLength);

	return shortenedSentence;
};

export const containsJapanese = (text: string) => {
	const japanesePattern =
		/[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFF66-\uFF9F]+/;
	const hasJapanese = japanesePattern.test(text);

	return hasJapanese;
};
