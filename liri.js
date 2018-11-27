// require("dotenv").config();
var keys = require("./keys.js");

//axios 
var axios = require("axios");

var nameArgv = process.argv;

var movieName = "";

for (var i = 2; i < nameArgv.length; i++) {

    if (i > 2 && i < nameArgv.length) {
        movieName = movieName + "+" + nameArgv[i];
    }
    else {
        movieName += nameArgv[i];
    }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
    function (response) {
        console.log("\r\n\r\n\r\n");
        console.log("***MOVIE***");
        console.log(".................");
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomato Rating: " + response.data.Ratings[1].Value);
        console.log("Production Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Actors: " + response.data.Actors);
        console.log("Plot: " + response.data.Plot);
        console.log("\r\n\r\n\r\n");
    }
)


//spotify-the-song
var Spotify = require('node-spotify-api');
var spotifyThisSong = function (trackQuery) {

    // var spotify = require('spotify');

    if (trackQuery === undefined) {
        trackQuery = "the sign ace of base";
    }

    spotify.search({
        type: 'track',
        query: songName
    },
        function (err, data) {
            if (err) {
                console.log("\r\n\r\n\r\n");
                console.log("Error occurred:" + err);
                console.log("\r\n\r\n\r\n");
                return;
            }
            else {
                for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                    if (i === 0) {
                        console.log("\r\n\r\n\r\n");
                        console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
                    }
                    else {
                        console.log("\r\n\r\n\r\n");
                        console.log("              " + data.tracks.items[0].artists[i].name);
                    }
                }
                console.log("\r\n\r\n\r\n");
                console.log("Song:         " + data.tracks.items[0].name);
                console.log("Preview Link: " + data.tracks.items[0].preview_url);
                console.log("Album:        " + data.tracks.items[0].album.name);

            }
        });
}
