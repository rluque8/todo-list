import Joi from "@hapi/joi";

export const taskCreateSchema = Joi.object().keys({
  description: Joi.string().required(),
  priority: Joi.number().min(1).max(3),
  status: Joi.string().valid("PENDING", "DROPPED", "DONE").required(),
});

export const taskGetAllSchema = Joi.object().keys({
  limit: Joi.number().min(0),
  skip: Joi.number().min(0),
});

export const taskUpdateStatusSchema = Joi.object().keys({
  status: Joi.string().valid("PENDING", "DROPPED", "DONE").required(),
});
