import Joi from 'joi'


export const createUserSchema = Joi.object({
name: Joi.string().required(),
email: Joi.string().email().required(),
role: Joi.string().valid("user", "uploader", "superadmin").default("user"),
profileImage: Joi.string().uri().optional(),
interests: Joi.array().items(Joi.string()).optional(),
password: Joi.string().required(),
});


export const updateUserSchema = Joi.object({
name: Joi.string().optional(),
profileImage: Joi.string().uri().optional(),
interests: Joi.array().items(Joi.string()).optional(),
});