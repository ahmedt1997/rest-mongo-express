const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const {Movie,ValidateMovie} = require('../models/movies');
const {Genre} =require('../models/genres');


router.get('/', async (req,res)=>{
    const movie = await Movie.find().sort('title')
    res.send(movie)
})


router.post('/',async (req,res) =>{
    const {error} = ValidateMovie(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('The given id was not found')

    let movie = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate

    });
    movie =await movie.save()
    res.send(movie);

})
module.exports = router;