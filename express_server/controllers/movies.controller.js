const { ObjectId } = require('mongodb');

let movies;

module.exports.connection = async (client) => {
    if (movies) {
        return
    };
    movies = await client.db('sample_mflix').collection('movies');
};

//return the twenty movies present on a particular page
module.exports.getMovies = async (pageNumber) => {
    try {
        let projection = {
            title: 1,
            year: 1,
            cast: 1,
            poster: 1,
            rated: 1,
            imdb: 1
        };
        let count = await movies
            .find()
            .count();
        let cursor = await movies
            .find()
            .sort({ year: -1 })
            .project(projection)
            .skip(pageNumber)
            .limit(20)
            .toArray();
        return [count, ...cursor];
    } catch (e) {
        console.error(e.stack);
        return [];
    };
};

//returns all the movies of a given actor
module.exports.getMoviesByActor = async (actor) => {
    try {
        let find = {
            cast: actor
        };
        let projection = {
            title: 1,
            year: 1,
            cast: 1,
            poster: 1,
            rated: 1,
            imdb: 1
        };
        let cursor = await movies
            .find(find)
            .project(projection)
            .toArray();
        return cursor;
    } catch (e) {
        console.error(e.stack);
        return [];
    };
};

//returns all the movies of a given genre
module.exports.getMoviesByGenre = async (genre) => {
    try {
        let find = {
            genres: genre
        };
        let projection = {
            title: 1,
            year: 1,
            cast: 1,
            poster: 1,
            rated: 1,
            imdb: 1
        };
        let count = await movies
            .find(find)
            .count();
        let cursor = await movies
            .find(find)
            .project(projection)
            .toArray();
        return [count, ...cursor];
    } catch (e) {
        console.error(e.stack);
        return [];
    };
};

//returns all the movies released in a given country
module.exports.getMoviesByCountry = async (country) => {
    try {
        let find = {
            countries: country
        };
        let projection = {
            title: 1
        };
        let cursor = await movies
            .find(find)
            .project(projection)
            .toArray();
        return cursor;
    } catch (e) {
        console.error(e.stack);
        return [];
    };
};

//returns a movie against a specified _id value
module.exports.getMoviesByID = async (_id) => {
    try {
        let find = {
            _id: ObjectId(_id)
        };
        let cursor = await movies
            .find(find)
            .toArray();
        return cursor;
    } catch (e) {
        console.log(e.stack);
        return [];
    };
};