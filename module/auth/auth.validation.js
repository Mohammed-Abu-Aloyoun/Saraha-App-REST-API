const Joi = require('joi');

const signup = {

    body:Joi.object().required().keys({
        userName : Joi.string().min(3).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20).required(),
        cpassword : Joi.string().valid(Joi.ref('password')).required()
    })

}

module.exports = { signup };
