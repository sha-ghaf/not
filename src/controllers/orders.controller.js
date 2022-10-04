import { Router } from 'express';
import * as OrdersService from '../services/orders/index.js';
import passport from 'passport';
import JoiMiddleware from '../helpers/middlewares/joiMiddleware.js';
import createOrderSchema from '../helpers/schemas/create-order.schema.js';
const ordersRouter = Router();

ordersRouter.get(
	'/me',
	passport.authenticate('jwt', { session: false }),
	OrdersService.getUserOrders,
);
ordersRouter.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	JoiMiddleware(createOrderSchema),
	OrdersService.createOrder,
);

export default ordersRouter;
