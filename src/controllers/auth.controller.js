import { Router } from 'express';
import loginSchema from '../helpers/schemas/login.schema.js';
import registerSchema from '../helpers/schemas/register.schema.js';
import * as AuthService from '../services/auth/index.js';
import JoiMiddleware from '../helpers/middlewares/joiMiddleware.js';
const authRouter = Router();

authRouter.post('/login', JoiMiddleware(loginSchema), AuthService.login);
authRouter.post(
	'/register',
	JoiMiddleware(registerSchema),
	AuthService.register,
);

export default authRouter;
