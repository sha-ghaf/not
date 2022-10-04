import {
	createdResponse,
	conflictResponse,
} from '../../helpers/functions/ResponseHandler.js';
import { prisma } from '../../index.js';
export async function createProduct(req, res, next) {
	try {
        const { role } = req.user;
        const { name, price, quantity, categoriesId } = req.body
		if (!(role === "Admin")) {
			return conflictResponse(res, 'user not Admin');
		}
        const newProduct = await prisma.product.create({
			data: {
				price,
				quantity,
				name,
				categoriesId,
			},
		});
		return createdResponse(res, 'Product created successfully', newProduct);
	} catch (err) {
		next(err);
	}
}