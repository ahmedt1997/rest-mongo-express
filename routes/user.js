const express = require('express');
const router = express.Router();
const {validateUser,User} = require('../models/user');
const bcrypt = require('bcrypt')
const lodash = require('lodash')

const auth = require('../middelware/auth')

router.get('/me',auth,async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password -_id ');
    res.send(user)


})

router.post('/',async (req,res) =>{
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email})
    if (user) return res.status(400).send('User already registred')
    

    
    user = new User (lodash.pick(req.body,['name','password','email']));
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)

    user= await user.save();
    const token = user.generateAuthToken()
    res.header('x-auth-token',token).send(lodash.pick(user,['name','email','_id']));


})

module.exports = router
