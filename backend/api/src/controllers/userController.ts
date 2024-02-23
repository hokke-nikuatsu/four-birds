import { type Request, type Response } from 'express';
import { updateUser as updateUserService } from '../services/userService';
import { dbConnection } from '../shared/db/connection';
import { type ApiResponse, STATUS, type UpdateUserRequest } from '../types/io';

export const generateCsrfToken = async (
	req: Request,
	res: Response<ApiResponse<void>>,
) => {
	try {
		res.cookie('X-CSRF-Token', req.csrfToken(), {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
		});
		res.status(200).send({
			status: STATUS.SUCCESS,
		});
	} catch (e) {
		if (e instanceof Error) {
			res.status(500).send({ status: STATUS.ERROR, message: e.message });
		} else {
			res.status(500).send({ status: STATUS.ERROR, message: 'Unknown error.' });
		}
	}
};

export const deleteCsrfToken = async (
	_req: Request,
	res: Response<ApiResponse<void>>,
) => {
	try {
		res.clearCookie('X-CSRF-Token');

		res.json({ status: STATUS.SUCCESS });
	} catch (e) {
		if (e instanceof Error) {
			res.status(500).send({ status: STATUS.ERROR, message: e.message });
		} else {
			res.status(500).send({ status: STATUS.ERROR, message: 'Unknown error.' });
		}
	}
};

export const updateUser = async (
	req: Request<UpdateUserRequest>,
	res: Response<ApiResponse<void>>,
) => {
	try {
		const user = req.body;

		if (!user) {
			throw new Error(`Request parameter is invalid.`);
		}

		const connection = await dbConnection();

		const articles = await updateUserService(connection, user);

		res.json({ status: STATUS.SUCCESS, data: articles });
	} catch (e) {
		if (e instanceof Error) {
			res.status(500).send({ status: STATUS.ERROR, message: e.message });
		} else {
			res.status(500).send({ status: STATUS.ERROR, message: 'Unknown error.' });
		}
	}
};
