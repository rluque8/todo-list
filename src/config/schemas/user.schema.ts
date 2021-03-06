import Joi from "@hapi/joi";

export const userLoginSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const userRegisterSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});
