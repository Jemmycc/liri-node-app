# **LIRI Bot**

## Overview
LIRI is a Language Interpretation and Recognition Interface. It’s a command line node app that allows you to search for movies, music and concerts.

## Getting Started
*	First, the user must have either “Terminal” for Mac or “Git Bash” for PC, node.js, and npm. In addition the following packages must be installed:
    *	npm install axios
    *	npm install --save node-spotify-api
    *	npm install --save bandsintown
    *	npm install dotenv

## Description
*	There are four command line options with the keyword “movie-this”, “spotify-this-song”, “concert-this” or “do-what-it-says”. 
    *	The “movie-this” keyword queries OMDb for the specified movie, and returns information about the movie such as title, release year, IMDB rating, Rotten Tomato rating, production country, language, actors, and plot.
    *	The “spotify-this-song” keyword queries Spotify for the specified song, and returns information about the song such as the artist(s), album, and preview URL. 
    *	The “concert-this” keyword queries Band in Town for the specified artist or band, and returns information about future concerts, such as venue name and location, and date of the event. 
    *	The “do-what-it-says” keyword reads a command from the file “random.txt” and performs the appropriate search.
    *	The results are output to the terminal and also stored in the file “log.txt”.

## Usage
*	In the terminal window, type “node liri.js” followed by the keyword and search text. Below are examples: 
    *	node liri.js movie-this <any movie title>
    *	node liri.js spotify-this-song <any song title>
    *	node liri.js concert-this <any artist or band>
    *	node liri.js do-what-it-says

## Development Details
*	Authentication keys for Spotify and axios are stored in "keys.js", and we are exporting its contents to the main "liri.js" file
*	Appropriate comments and error-checking has been added.

## Resources
*	Node.js
*	JavaScript
*	Spotify API (via spotify npm module)
*	OMDb API (via axios npm module)
*	Band in Town API (via bandintown npm module)
*	DotEnv API (via dotenv npm module)
*	Moment API (via Moment module)

## Colophon
Credit: Miya studio team
Copyright: All Rights Reserved and Confidential
Contribution: When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.
Reference: 
    https://www.npmjs.com/package/node-spotify-api
    https://www.npmjs.com/package/axios
    https://www.npmjs.com/package/bandsintown
    https://www.npmjs.com/package/dotenv
    https://www.npmjs.com/package/moment
