import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import articleRoute from './routes/articleRoute';
import healthCheckRoute from './routes/healthCheckRoute';
import userRoute from './routes/userRoute';
import { API_HEALTH_CHECK, API_ARTICLE, API_USER } from './utils/api';
import { errorHandler } from './utils/common';
import { ALLOWED_ORIGIN } from './utils/env';

const app = express();

app.use(
	cors({
		origin: ALLOWED_ORIGIN,
		credentials: true,
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_ARTICLE, articleRoute);
app.use(API_USER, userRoute);
app.use(API_HEALTH_CHECK, healthCheckRoute);

app.use(errorHandler);

export default app;
