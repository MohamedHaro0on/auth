const Joi = require("joi");

module.exports = {
    addUserSchema: {
        body : Joi.object().required().keys({
            // age : Joi.number().required() ,
            firstName : Joi.string().required(),
            lastName : Joi.string().required(),
            email : Joi.string().required().email(),
            // image : Joi.string().required(),
            role : Joi.string().required(),
            password :Joi.string().required(),
        })
    },
    deleteUserSchema : {
        params : Joi.object().required().keys({
            id : Joi.string().required(),
        })
    },
    updateUserSchema : {
        params : Joi.object().required().keys({
            id : Joi.string().required() ,
        }),
        body : Joi.object().required().keys({
            // age : Joi.number().required() ,
            firstName : Joi.string().required(),
            lastName : Joi.string().required(),
            email : Joi.string().required().email(),
            // image : Joi.string().required(),
            role : Joi.string().required(),
        }),
    },
    signInSchema :{
        body : Joi.object().required().keys({
            email : Joi.string().required().email() ,
            password : Joi.string().required(),
        })
    }
}