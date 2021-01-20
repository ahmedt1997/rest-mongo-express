const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const config = require('config')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:250,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:250,
    },
    isAdmin:Boolean
})

UserSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({_id:this._id , isAdmin:this.isAdmin},config.get('jwtPrivateKey'))
    return token
}

const User =  mongoose.model('User',UserSchema) ;


function validateUser(user){
    const Schema = {
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(5).max(250).email().required(),
        password:Joi.string().min(6).max(250).required(),
      
    }
    return Joi.validate(user,Schema);

}

module.exports.validateUser=validateUser
module.exports.User=User