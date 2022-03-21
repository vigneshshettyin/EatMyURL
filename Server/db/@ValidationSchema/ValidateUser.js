const Joi = require("joi");
const pattern = `.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$`;
const UserSchemaValidation = Joi.object().keys({
  name: Joi.string().trim().required().min(3).max(25),
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required().min(4).regex(new RegExp(pattern)),
});

module.exports = UserSchemaValidation;
