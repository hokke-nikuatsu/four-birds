import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import newsRoutes from './routes/newsRoutes';
import { ALLOWED_ORIGIN } from './utils/env';

const app = express();

app.use(
	cors({
		origin: ALLOWED_ORIGIN,
	}),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/news', newsRoutes);

export default app;
