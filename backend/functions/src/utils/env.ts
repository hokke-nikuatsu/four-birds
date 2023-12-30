import { loadEnvProperty } from './common';

// Cloud Functions
export const FUNCTIONS_REGION = loadEnvProperty(
	'FUNCTIONS_REGION',
);

// Newsdata.io API
export const NEWSDATA_IO_API_KEY = loadEnvProperty(
	'NEWSDATA_IO_API_KEY',
);
export const NEWSDATA_IO_API_URL = loadEnvProperty(
	'NEWSDATA_IO_API_URL',
);

// Planetscale API
export const DB_URL = loadEnvProperty('DB_URL');
export const DB_NAME = loadEnvProperty('DB_NAME');
export const DB_USER_NAME = loadEnvProperty('DB_USER_NAME');
export const DB_PASSWORD = loadEnvProperty('DB_PASSWORD');
