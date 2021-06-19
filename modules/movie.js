'use strict'
const  axios = require('axios');
const { response } = require('express');
module.exports = handleMovie;

function handleMovie(req,res){
    let inMemory={};
    let {searchQuery}=(req.query);
    let movieKey=process.env.movies_key;
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchQuery}`;

    if ((inMemory [searchQuery]) !== undefined ){
        response.send(inMemory[searchQuery])
        console.log('in memory');
    }
    else{
        console.log('from API');
 axios.get(url)
    .then(result =>{
       let movieArr = result.data.results.map(item => {
         console.log('in result');
         inMemory[searchQuery]=(movieArr) ; 
         res.send(movieArr)
            return new Movie(item)
        })
         
    }).catch(err => {
console.log(searchQuery,'inError');
        res.status(500).send(`error in getting data ${err}`);
        })


}}

class Movie {
    constructor(item){
        this.title=item.title;
        this.overview=item.overview;
        this.average_votes=item.vote_average;
        this.total_votes=item.vote_count;
        this.image_url='https://image.tmdb.org/t/p/w500'+item.poster_path;
        this.popularity=item.popularity;
        this.released_on=item.release_date;
    }
}