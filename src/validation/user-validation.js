import Joi from "joi";

// ini bikin 'schema' joi
const registerValidation = Joi.object({
    username: Joi.string().max(20).required(),
    password: Joi.string().max(20).pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[!@\\-\_#$%^&*])[A-Za-z\\d!@\\-\_#$%^&*]{8,20}$')).required(),
    email: Joi.string().max(30).email({ minDomainSegments: 2, }).required(),
    phone: Joi.string().max(20).pattern(new RegExp('^[0-9]+$')).required(),
});

const updateValidation = Joi.object({
    avatar: Joi.string().max(250).optional(),
    firstname: Joi.string().max(50).pattern(new RegExp('^[A-z]+$')).optional(),
    lastname: Joi.string().max(50).pattern(new RegExp('^[A-z]+$')).optional(),
    phone: Joi.string().max(20).pattern(new RegExp('^[0-9]+$')).optional(),
    gender: Joi.number().optional(),
    birthdate: Joi.date().optional(),
    city: Joi.string().max(30).optional(),
    region: Joi.string().max(50).optional(),
    country: Joi.string().max(20).optional(),
}).unknown();

export {
    registerValidation,
    updateValidation
};