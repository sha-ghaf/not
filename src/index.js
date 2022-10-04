import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import logger from './helpers/middlewares/logger.js';
import errorHandler from './helpers/middlewares/errorHandler.js';
import authRouter from './controllers/auth.controller.js';
import ordersRouter from './controllers/orders.controller.js';
import productsRouter from './controllers/product.controller.js';
import registerStrategies from './helpers/functions/registerStrategies.js';
const prisma = new PrismaClient();
dotenv.config();

const app = express();
registerStrategies();

// -- Middlewares --
app.use(express.json());
app.use(logger);

// -- Routes --
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
	console.log(`Server is listening on port ${process.env.PORT}`);
});

export { prisma };
