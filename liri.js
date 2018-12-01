/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
require("dotenv").config();

// vars for the packages
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require('moment');

// argv[2] chooses users actions; argv[3] is input parameter, ie, movie title
var userCommand = process.argv[2];
var searchText = process.argv[3];

// concatenate multiple words in 2nd user argument
for (var i = 4; i < process.argv.length; i++) {
    searchText += " " + process.argv[i];
}

doSearch(userCommand, searchText);

function doSearch(userCommand, searchText) {
    switch (userCommand) {
        case "movie-this":
            getMovie(searchText);
            break;

        case "spotify-this-song":
            getMySpotify(searchText);
            break;

        case "concert-this":
            getEvent(searchText);
            break;

        case "do-what-it-says":
            getFileCommand(searchText);
            break;

        default:
            sendHelp();
            break;
    }
}

// axios
function getMovie(movieName) {
    if (!movieName) {
        movieName = "Mr Nobody";
        logText("\nIf you haven't watched 'Mr.Nobody,' you should watch it at : http://www.imdb.com/title/tt0485947/\n" +
            "It's on Netflix!");
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // run axios search
    axios.get(queryUrl)
        .then(function (response) {
            var axiosResults =

                "\n" + "================ MOVIE INFO================" + "\n" +
                "Title:                 " + response.data.Title + "\n" +
                "Release Year:          " + response.data.Year + "\n" +
                "IMDB Rating:           " + response.data.imdbRating + "\n" +
                "Rotten Tomato Rating:  " + response.data.Ratings[1].Value + "\n" +
                "Production Country:    " + response.data.Country + "\n" +
                "Language:              " + response.data.Language + "\n" +
                "Actors:                " + response.data.Actors + "\n" +
                "Plot:                  " + response.data.Plot + "\n" +
                "================= THE END ==================" + "\n";

            logText(axiosResults);
        })
        .catch(function (error) {
            if (error.response) {
                logText("There is a data error: " + error.response.data);
                logText("There is a status error: " + error.response.status);
                logText("There is a headers error: " + error.response.headers);
            } else if (error.request) {
                logText("There is a request error: " + error.request);
            } else {
                logText("\n\tCan't find a movie named: " + movieName);
            }
        });
}

// spotify
function getMySpotify(songName) {
    if (!songName) {
        songName = "The Sign";
    }

    // fetch spotify keys
    var spotify = new Spotify(keys.spotify);

    // run a spotify search
    spotify.search({
        type: 'track',
        query: songName
    },
        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                var spotifyResults = "";

                if (trackInfo.length === 0) {
                    logText("\n\tCan't find a song named: " + songName);
                    return;
                }

                for (var i = 0; i < trackInfo.length; i++) {
                    if (trackInfo[i].name.toLowerCase() === songName.toLowerCase()) {
                        var artists = "";
                        for (var j = 0; j < trackInfo[i].artists.length; j++) {
                            artists += trackInfo[i].artists[j].name + ", ";
                        }
                        artists = artists.slice(0, artists.length - 2);

                        spotifyResults +=
                            "\n" + "================ SONG INFO =================" + "\n" +
                            "Song:        " + trackInfo[i].name + "\n" +
                            "Artist(s):   " + artists + "\n" +
                            "Album:       " + trackInfo[i].album.name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "================= THE END ==================" + "\n";
                    }
                    logText(spotifyResults);
                }
            } else {
                logText("\n\tSpotify error: " + err);
            }
        });
}

// Bands in Town
function getEvent(artistName) {
    if (!artistName) {
        logText("\n\tTry again with an artist's name.");
        return;
    }
    var url = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=anythingfortheappidwillwork";

    axios.get(url)
        .then(function (response) {
            var eventInfo = response.data;
            var concertResults = "";

            for (var i = 0; i < eventInfo.length; i++) {
                concertResults +=
                    "\n" + "=============== CONCERT INFO ===============" + "\n" +
                    "Artist(s):         " + eventInfo[i].lineup + "\n" +
                    "Name of the venue: " + eventInfo[i].venue.name + "\n" +
                    "Venue location:    " + eventInfo[i].venue.city + ", " + eventInfo[i].venue.region + "\n" +
                    "Date of the Event: " + moment(eventInfo[i].datetime).format("MM/DD/YYYY") + "\n" +
                    "================= THE END ==================" + "\n";
            }
            logText(concertResults);
        })
        .catch(function (error) {
            if (error.response) {
                logText("There is a data error: " + error.response.data);
                logText("There is a status error: " + error.response.status);
                logText("There is a headers error: " + error.response.headers);
            } else if (error.request) {
                logText("There is a request error: " + error.request);
            } else {
                logText("\n\tCan't find a concert for artist(s): " + artistName);
            }
        });
}

// do what it says
function getFileCommand() {
    var fileName = "random.txt";

    fs.readFile(fileName, "utf8", function (error, data) {
        if (!error) {
            var indx = data.indexOf(",");
            userCommand = data.slice(0, indx).trim();

            indx = data.indexOf('"');
            var indxLast = data.lastIndexOf('"');
            searchText = data.slice(indx + 1, indxLast).trim();

            doSearch(userCommand, searchText);
        } else {
            logText("Error reading file " + fileName);
        }
    });
}

// help users to know the command syntax
function sendHelp() {
    console.log("\n" +
        "Type one of the following commands after 'node liri.js':\n" +
        "\tmovie-this <any movie title>\n" +
        "\tspotify-this-song <any song title>\n" +
        "\tconcert-this <any artist or band>\n" +
        "\tdo-what-it-says");
}

// write the results to the console and log.txt
function logText(outStr) {
    fs.appendFile("log.txt", outStr + "\n", function (err) {
        if (err) {
            return console.log(err);
        }
    });
    console.log(outStr);
}
