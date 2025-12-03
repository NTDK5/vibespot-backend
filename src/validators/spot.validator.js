import Joi from 'joi'


export const createSpotSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().valid("photo_spot", "activity", "gallery", "workspace", "restaurant").required(),
    address: Joi.string().required(),
    location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    }).required(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    thumbnail: Joi.string().uri().optional(),
    priceRange: Joi.string().valid("free", "low", "medium", "high").required(),
    tags: Joi.array().items(Joi.string()).optional(),
    bestTime: Joi.string().optional(),
    createdBy: Joi.string().required(),
    });
    
    
export    const updateSpotSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    category: Joi.string().valid("photo_spot", "activity", "gallery", "workspace", "restaurant").optional(),
    address: Joi.string().optional(),
    location: Joi.object({
    lat: Joi.number().optional(),
    lng: Joi.number().optional(),
    }).optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
    thumbnail: Joi.string().uri().optional(),
    priceRange: Joi.string().valid("free", "low", "medium", "high").optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    bestTime: Joi.string().optional(),
    status: Joi.string().valid("pending", "approved", "rejected").optional(),
    });