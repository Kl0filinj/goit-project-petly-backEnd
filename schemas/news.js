const Joi = require("Joi");
const { Schema } = require("mongoose");

const joiSchema = Joi.object({
    title: Joi.string().require(),
    url: Joi.string().require(),
    description: Joi.string().require(),
    date: Joi.string().require(),
})

const newsSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    date: {
        type: String,
        require: true,
    },

});

module.exports = {
    joiSchema,
    newsSchema,
}
    