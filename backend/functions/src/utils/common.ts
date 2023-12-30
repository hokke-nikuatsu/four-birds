import dotenv from 'dotenv';

dotenv.config();

export const loadEnvProperty = (property: string) => {
	const value = process.env[property];
	if (!value) {
		throw new Error(
			`${value} is not defined in the environment variables.`,
		);
	}

	return value;
};
