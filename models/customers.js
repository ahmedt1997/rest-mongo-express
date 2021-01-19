const mongoose = require('mongoose');
const Joi = require('joi');


const Customer =  mongoose.model('Customer',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    isGold:{
        type:Boolean,
        required:true,
        default:false
    },
    phone:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
})) ;


function validateCustomer(customer){
    const Schema = {
        name:Joi.string().min(3).max(50).required(),
        isGold:Joi.boolean().required(),
        phone:Joi.string().required().min(5).max(50)
    }
    return Joi.validate(customer,Schema);

}

module.exports.validateCustomer=validateCustomer
module.exports.Customer=Customer