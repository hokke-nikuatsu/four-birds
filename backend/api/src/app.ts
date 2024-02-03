import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import articleRoutes from './routes/articleRoutes';
import healthCheckRoute from './routes/healthCheckRoute';
import { API_HEALTH_CHECK, API_ARTICLE } from './utils/api';
import { ALLOWED_ORIGIN } from './utils/env';

const app = express();

app.use(
	cors({
		origin: ALLOWED_ORIGIN,
	}),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(API_ARTICLE, articleRoutes);
app.use(API_HEALTH_CHECK, healthCheckRoute);

export default app;
