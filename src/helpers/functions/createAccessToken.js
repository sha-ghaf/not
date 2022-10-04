import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export default function createAccessToken(userId) {
	return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);
}
