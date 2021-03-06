import Joi from "@hapi/joi";

export const taskCreateSchema = Joi.object().keys({
  description: Joi.string().required().email(),
  priority: Joi.number().min(1).max(3),
  status: Joi.string().optional(),
});

export const taskGetAllSchema = Joi.object().keys({
  limit: Joi.string(),
  skip: Joi.string(),
});

export const taskUpdateStatusSchema = Joi.object().keys({
  status: Joi.string().required(),
});
