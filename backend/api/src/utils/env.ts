import { loadEnvProperty } from './common';

// CORS
export const ALLOWED_ORIGIN = loadEnvProperty('ALLOWED_ORIGIN');

// Planetscale API
export const DB_URL = loadEnvProperty('DB_URL');
export const DB_NAME = loadEnvProperty('DB_NAME');
export const DB_USER_NAME = loadEnvProperty('DB_USER_NAME');
export const DB_PASSWORD = loadEnvProperty('DB_PASSWORD');
