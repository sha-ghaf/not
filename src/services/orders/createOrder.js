import {
	badRequestResponse,
	createdResponse,
	notFoundResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function createOrder(req, res, next) {
	try {
		const { cart } = req.body;
		const { id } = req.user;
		for (let i = 0; i < cart.length; i++) {
			const product = cart[i];
			const productInStock = await prisma.products.findUnique({
				where: {
					id: product.productId,
				},
			});
			if (!productInStock) {
				return notFoundResponse(res, 'Product not found');
			}
			if (productInStock.quantity === 0) {
				return badRequestResponse(res, 'Product out of stock');
			}
			if (product.quantityTaken > productInStock.quantity) {
				return badRequestResponse(
					res,
					`quantityTaken cannot be more than ${productInStock.quantity}`,
				);
			}
			cart[i].price = productInStock.price;
		}
		const totalPrice = cart.reduce(
			(acc, item) => acc + item.price * item.quantityTaken,
			0,
		);

		let newOrder = await prisma.orders.create({
			data: {
				userId: id,
				totalPrice,
			},
		});
		const cartItems = cart.map((item) => {
			return {
				quantityTaken: item.quantityTaken,
				productId: item.productId,
				orderId: newOrder.id,
			};
		});
		await prisma.orderProducts.createMany({
			data: cartItems,
		});
		for (const product of cart) {
			await prisma.products.update({
				where: {
					id: product.productId,
				},
				data: {
					quantity: {
						decrement: product.quantityTaken,
					},
				},
			});
		}
		newOrder = await prisma.orders.findUnique({
			where: {
				id: newOrder.id,
			},
			select: {
				id: true,
				totalPrice: true,
				OrderProducts: {
					select: {
						quantityTaken: true,
						product: {
							select: {
								id: true,
								name: true,
								price: true,
							},
						},
					},
				},
			},
		});
		return createdResponse(res, 'Order created successfully', newOrder);
	} catch (err) {
		next(err);
	}
}
