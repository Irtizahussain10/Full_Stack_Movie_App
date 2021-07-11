const { ObjectId } = require('mongodb');

let movies;

module.exports.connection = async (client) => {

    try {

        if (movies) {
            return;
        };

        movies = await client
            .db('sample_mflix')
            .collection('movies');

    } catch (e) {

        console.error(e.message);

    };

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
            .skip(pageNumber * 20)
            .limit(20)
            .toArray();

        return [count, ...cursor];

    } catch (e) {
 
        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

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
            .sort({ year: -1 })
            .project(projection)
            .toArray();

        return cursor;

    } catch (e) {

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

    };

};

//returns all the movies of a given genre
module.exports.getMoviesByGenre = async (page, genre) => {

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
            .sort({ year: -1 })
            .skip(page * 20)
            .limit(20)
            .project(projection)
            .toArray();

        return [count, ...cursor];

    } catch (e) {

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

    };

};

//returns all the movies released in a given country
module.exports.getMoviesByCountry = async (page, country) => {

    try {

        let find = {
            countries: country
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
            .sort({ year: -1 })
            .project(projection)
            .skip(page * 20)
            .limit(20)
            .toArray();

        return [count, ...cursor];

    } catch (e) {

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

    };

};

//returns a movie against a specified _id value
module.exports.getMoviesByID = async (id) => {

    try {

        const pipeline = [
            {
                $match: {
                    _id: ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "comments",
                    let: {
                        id: "$_id"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$movie_id", "$$id"
                                    ]
                                }
                            }
                        },
                        {
                            $sort: {
                                date: -1
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                text: 1
                            }
                        }
                    ],
                    as: "comments"
                }
            }
        ];

        let projection = {
            _id: 0,
            title: 1,
            year: 1,
            rated: 1,
            directors: 1,
            fullplot: 1,
            imdb: 1,
            metacritic: 1,
            tomatoes: 1,
            poster: 1,
            cast: 1,
            genres: 1,
            writers: 1,
            comments: 1,
            runtime: 1
        };

        let cursor = await movies
            .aggregate(pipeline)
            .project(projection)
            .toArray();

        return cursor;

    } catch (e) {

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

    };

};

module.exports.getMoviesByText = async (text, page) => {

    try {

        let find = {
            $text: {
                $search: `\"${text}\"`
            }
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
            .sort({ year: -1 })
            .project(projection)
            .skip(page * 20)
            .limit(20)
            .toArray();

        return [count, ...cursor];

    } catch {

        if (e.name === 'MongoNetworkError') {
            return ['Server lost connection to the internet'];
        };

    };

};