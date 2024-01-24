// API
export const DEV_API_HOST = 'http://localhost';
export const PROD_API_HOST = 'https://four-birds-backend.onrender.com';
export const API_PORT = '3001';
export const API_ROOT = 'api';

const ENV = process.env.ENV || 'development';

console.log('ENV: ', ENV);

let API_HOST;
switch (ENV) {
	case 'production':
		API_HOST = PROD_API_HOST;
		break;
	case 'development':
		API_HOST = DEV_API_HOST;
		break;
	default:
		throw new Error(`Unknown environment: ${ENV}`);
}

export const API_URL = `${API_HOST}:${API_PORT}/${API_ROOT}`;
