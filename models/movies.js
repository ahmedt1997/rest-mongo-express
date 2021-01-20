const mongoose = require('mongoose');
const Joi = require('joi') ; 
const {GenreSchema} = require('./genres');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255,
    },
    genre:{

        type:GenreSchema,
        required:true
        
    },

    
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },

    dailyRentalRate:{
        type:Number,
        required:true,
        min:0
    }

}))

function ValidateMovie(movie){
    // tres important 
    const Schema = {
        title:Joi.string().required().min(2).max(255),
        numberInStock:Joi.number().required().min(0),
        dailyRentalRate:Joi.number().required().min(0),
        genreId:Joi.string().required()
    }
    return Joi.validate(movie,Schema)
}

module.exports.ValidateMovie=ValidateMovie
module.exports.Movie=Movie