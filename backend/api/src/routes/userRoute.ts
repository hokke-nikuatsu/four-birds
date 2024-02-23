import express from 'express';
import {
	updateUser,
	generateCsrfToken,
	deleteCsrfToken,
} from '../controllers/userController';
import { csrfProtection, verifyXRequestedWith } from '../utils/security';

const router = express.Router();

router.use(csrfProtection);

router.get('/', generateCsrfToken);
router.delete('/', deleteCsrfToken);
router.put('/', verifyXRequestedWith, updateUser);

export default router;
