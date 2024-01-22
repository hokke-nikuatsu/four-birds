import dotenv from 'dotenv';

dotenv.config();

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
