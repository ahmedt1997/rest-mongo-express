const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')


router.post('/',async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email})
    if (!user) return res.status(400).send('Invalid email or password ')
    
    const ValidPassword = await bcrypt.compare(req.body.password,user.password)
    if(!ValidPassword)  return res.status(400).send('Invalid email or password ')

    //code pour jwt 

    const token = user.generateAuthToken()

    res.send(token)
    



})


function validate(req){
    const Schema = {
        email:Joi.string().min(5).max(250).email().required(),
        password:Joi.string().min(6).max(250).required(),
      
    }
    return Joi.validate(req,Schema);

}

module.exports = router
