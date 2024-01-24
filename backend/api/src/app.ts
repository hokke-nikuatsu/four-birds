import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import healthCheckRoute from './routes/healthCheckRoute';
import newsRoutes from './routes/newsRoutes';
import { API_HEALTH_CHECK, API_NEWS } from './utils/api';
import { ALLOWED_ORIGIN } from './utils/env';

const app = express();

app.use(
	cors({
		origin: ALLOWED_ORIGIN,
	}),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(API_NEWS, newsRoutes);
app.use(API_HEALTH_CHECK, healthCheckRoute);

export default app;
