const mongoose = require('mongoose')
const Joi = require('joi');

const GenreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50
        
    }
})

const Genre =  mongoose.model('Genre',GenreSchema) ; 



function validateGenre(genre){
    const Schema = {
        name:Joi.string().min(3).required()
    } ; 
    return Joi.validate(genre,Schema);
}

module.exports.validateGenre=validateGenre
module.exports.Genre=Genre
module.exports.GenreSchema=GenreSchema



/* let book = {
    name:'name of the book'
}

let author = {
    name:'ahmed',
    book:'id'
} */