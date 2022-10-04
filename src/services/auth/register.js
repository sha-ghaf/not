import {
	conflictResponse,
	okResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
import bcrypt from 'bcrypt';
import createAccessToken from '../../helpers/functions/createAccessToken.js';
export async function register(req, res, next) {
	try {
		const { email, password, name, phoneNumber } = req.body;
		const checkEmail = await prisma.users.findUnique({
			where: {
				email,
			},
		});
		if (checkEmail) {
			return conflictResponse(res, 'Email already exists');
		}
		const checkPhoneNumber = await prisma.users.findUnique({
			where: {
				phoneNumber,
			},
		});
		if (checkPhoneNumber) {
			return conflictResponse(res, 'Phone Number already exists');
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		const newUser = await prisma.users.create({
			data: {
				email,
				password: encryptedPassword,
				name,
				phoneNumber,
			},
		});
		const accessToken = createAccessToken(newUser.id);
		delete newUser.password;
		return okResponse(res, 'User created successfully', {
			...newUser,
			accessToken,
		});
	} catch (err) {
		next(err);
	}
}
