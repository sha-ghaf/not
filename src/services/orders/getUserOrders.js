import { okResponse } from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';

export async function getUserOrders(req, res, next) {
	try {
		const { id } = req.user;
		const orders = await prisma.orders.findMany({
			where: {
				userId: id,
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
		return okResponse(res, 'Orders fetched successfully', orders);
	} catch (err) {
		next(err);
	}
}
