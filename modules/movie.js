'use strict'
const  axios = require('axios');
const { response } = require('express');
module.exports = handleMovie;

function handleMovie(req,res){
    
    let {searchQuery}=(req.query);
    let movieKey=process.env.movies_key;
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchQuery}`;

    axios.get(url)
    .then(results => {
        const moviesArray = results.data.results.map(movie => new Movie (movie));
        response.status(200).send(moviesArray);
    })

}
class Movie {
    constructor(movie){

        this.title=item.title;
        this.overview=item.overview;
        this.average_votes=item.vote_average;
        this.total_votes=item.vote_count;
        this.image_url='https://image.tmdb.org/t/p/w500'+item.poster_path;
        this.popularity=item.popularity;
        this.released_on=item.release_date;
    }
}
