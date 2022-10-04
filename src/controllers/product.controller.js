import { Router } from 'express';
import * as ProductsService from '../services/product/index.js';
import passport from 'passport';
import JoiMiddleware from '../helpers/middlewares/joiMiddleware.js';
import createOrderSchema from '../helpers/schemas/create-order.schema.js';
const productsRouter = Router();

productsRouter.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	// ProductsService.getUserOrders,
);
productsRouter.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	JoiMiddleware(createOrderSchema),
	// ProductsService.createOrder,
);
productsRouter.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	JoiMiddleware(createOrderSchema),
	ProductsService.createProduct,
);

export default productsRouter;