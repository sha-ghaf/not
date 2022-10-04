import {
	okResponse,
	unAuthorizedResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
import bcrypt from 'bcrypt';
import createAccessToken from '../../helpers/functions/createAccessToken.js';
export async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});
		if (!user) {
			return unAuthorizedResponse(res, 'Invalid email or password');
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return unAuthorizedResponse(res, 'Invalid email or password');
		}
		const accessToken = createAccessToken(user.id);
		delete user.password;
		return okResponse(res, 'Login successful', { ...user, accessToken });
	} catch (err) {
		next(err);
	}
}
