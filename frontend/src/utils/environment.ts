const DEV_API_HOST = 'http://localhost:3001';
const PROD_API_HOST = 'https://four-birds-backend.onrender.com';
const API_ROOT = 'api';

export const ENV = process.env.ENV || 'development';

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

export const API_URL = `${API_HOST}/${API_ROOT}`;
