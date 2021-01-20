const {validateGenre,Genre} =require('../models/genres');
const auth = require('../middelware/auth')
const admin = require('../middelware/admin')
const express = require('express');
const lodash = require('lodash')

const router = express.Router();


 

router.get('/',async (req,res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres)
})

router.get('/:id',async(req,res)=>{
    const genre = await Genre.findById(req.params.id)
    if (!genre) return res.status(404).send('The given id was not found')
    res.send(genre)
})

router.post('/',auth,async (req,res) =>{
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    

  /*   let genre = new Genre ({
    
        name:req.body.name.toLowerCase()
    }); */

    genre = await Genre.findOne({name:req.body.name.toLowerCase()})
    if(genre) return res.status(404).send('this genre is already exist')
    genre = new Genre (lodash.pick(req.body,['name']));
    genre= await genre.save();
    res.send(genre);


})


router.delete('/:id',[auth,admin],async(req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('The given id was not found')
    res.send(genre)
})

router.put('/:id',auth, async (req,res)=>{

    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre =await  Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})

    if(!genre) return res.status(404).send('The given id was not found')

    res.send(genre)
})





module.exports = router;

