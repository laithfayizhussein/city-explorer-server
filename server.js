  
'use strict';

//overall creat a new application (npm init -y)
require('dotenv').config();//install dotenv(npm i dotenv)/require .env 
const express = require ('express');//require express (npm i express)
const cors = require('cors');//require Cross-Origin Resource Sharing(npm i cors)
const  axios = require('axios');
const handleMovie = require('./modules/movie.js')
const handelWeather = require ('./modules/weather');
const server = express();
server.use(cors());// (allow public access permission )
const PORT = process.env.PORT;



    server.get('/',(req,res) => { res.send('Test')})

    server.get('/test',(req,res) => {
        let first=req.query.first
        console.log("query",first); 
    })
    server.get('/weather',handelWeather) ;
    server.get('/movie',handleMovie);
    server.get('/bitWeather',handelWeather);
 
    server.get('*',(request,response) => {
    response.send('Something Wrong') })
server.listen(PORT ,()=>{
console.log(`Server Listinig on PORT ${PORT}`); })