import { okResponse } from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';

export async function getUserProducts(req, res, next) {
	try {
		const products = await prisma.products.findUnique({
			select: {
                id: true,
                name: true,
                price: true,
                quantity: true,
                category: true,
            }
		});
		return okResponse(res, 'products fetched successfully', products);
	} catch (err) {
		next(err);
	}
}