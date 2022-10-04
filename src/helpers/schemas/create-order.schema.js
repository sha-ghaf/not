import Joi from 'joi';

const createOrderSchema = Joi.object({
	cart: Joi.array()
		.min(1)
		.items(
			Joi.object({
				productId: Joi.number().required().messages({
					'number.base': 'productId must be a number',
					'any.required': 'productId is a required field',
				}),
				quantityTaken: Joi.number().required().messages({
					'number.base': 'quantityTaken must be a number',
					'any.required': 'quantityTaken is a required field',
				}),
			}),
		)
		.required()
		.messages({
			'array.base': 'cart must be an array',
			'array.min': 'cart must have at least 1 item',
			'any.required': 'cart is a required field',
		}),
});

export default createOrderSchema;
