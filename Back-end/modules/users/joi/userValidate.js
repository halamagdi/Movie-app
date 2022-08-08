const Joi = require("joi");

module.exports = {
  addUserSchema: {
    body: Joi.object()
      .required()
      .keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email().messages({
          "string.empty": "can't be an empty field",
          "string.valid": "email is already exists !",
        }),
        password: Joi.string().required(),
        age: Joi.number(),
      }),
  },
  signInUserSchema: {
    body: Joi.object()
      .required()
      .keys({
        email: Joi.string().required().email().messages({
          "string.empty": "can't be an ampty field",
        }),
        password: Joi.string().required(),
      }),
  },
};
