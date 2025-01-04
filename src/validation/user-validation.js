import Joi from "joi";

// ini bikin 'schema' joi
const registerValidation = Joi.object({
    username: Joi.string().max(20).required(),
    password: Joi.string().max(20).pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[!@\\-\_#$%^&*])[A-Za-z\\d!@\\-\_#$%^&*]{8,20}$')).required(),
    email: Joi.string().max(30).email({ minDomainSegments: 2, }).required(),
    phone: Joi.string().max(20).pattern(new RegExp('^[0-9]+$')).required(),
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(20).required(),
    password: Joi.string().max(20).pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[!@\\-\_#$%^&*])[A-Za-z\\d!@\\-\_#$%^&*]{8,20}$')).required(),
}).unknown();

export {
    registerValidation,
};