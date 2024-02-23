import csrf from 'csurf';
import { type NextFunction, type Request, type Response } from 'express';

export const csrfProtection = csrf({
	cookie: true,
	value: (req) => {
		const token = req.cookies['X-CSRF-Token'];
		if (!token) {
			throw new Error('Invalid request.');
		}
		return token;
	},
});

export const verifyXRequestedWith = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
		res.status(403).send({ message: 'Invalid request.' });
	}

	next();
};
