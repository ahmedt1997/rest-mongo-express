const mongoose = require('mongoose')

const express = require('express')

const genres = require('./routes/genres');

const customer = require('./routes/customer');

const movies = require('./routes/movies')

const user = require('./routes/user')

const auth = require('./routes/auth')


mongoose.connect('mongodb://localhost/videly').then(()=>{
    console.log('connected')
}).catch(err=>console.error(err));


const app = express()

app.use(express.json())
app.use('/api/genres',genres);
app.use('/api/user',user);

app.use('/api/customer',customer); 

app.use('/api/movies',movies); 
app.use('/api/auth',auth); 

app.listen(3000 , () => console.log('listening '))