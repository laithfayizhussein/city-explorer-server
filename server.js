
require('dotenv').config();
const express = require('express') 
const cors = require('cors');
const axios = require('axios');

const handelWeather = require('./modules./weather.js');
const handleMovie = require('./modules./movies.js')


const PORT = process.env.PORT;
const server = express();
server.use(cors())

server.get('/', (req, res) => {
    res.send('Hello World')
});

server.get('/weather' , handleWeather);
server.get('/movie' , handleMovie);

function handleWeather (request , response) {
    let city = request.query.searchQuery ;
    weather(city)
    .then(summaries => response.send(summaries))
    .catch((error)=>{
        response.status(500).send('something wrong')
    });
}


server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});