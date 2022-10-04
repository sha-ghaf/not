import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { prisma } from '../../index.js';
dotenv.config();
const JWTStrategy = new Strategy(
	{
		secretOrKey: process.env.ACCESS_TOKEN_SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	},
	async (payload, done) => {
		try {
			const user = await prisma.users.findUnique({
				where: {
					id: payload.userId,
				},
			});
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		} catch (err) {
			return done(err, false);
		}
	},
);

export default JWTStrategy;
