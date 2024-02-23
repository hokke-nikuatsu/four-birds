import { type Request, type Response } from 'express';
import { STATUS } from '../types/io';

export const healthCheck = async (_req: Request, res: Response) => {
	try {
		res.sendStatus(200);
	} catch (e) {
		if (e instanceof Error) {
			res.status(500).send({ status: STATUS.ERROR, message: e.message });
		} else {
			res.status(500).send({ status: STATUS.ERROR, message: 'Unknown error.' });
		}
	}
};
