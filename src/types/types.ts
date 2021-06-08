export type movies = {
    _id: String,
    plot: String,
    genres: String[],
    runtime: number,
    cast: String[],
    num_mflix_comments: number,
    title: String,
    fullplot: String,
    countries: String[],
    released: String,
    directors: String[],
    rated: String,
    awards: {
        wins: number,
        nominations: number,
        text: String
    },
    lastupdated: String,
    year: number,
    imdb: {
        rating: number,
        votes: number,
        id: number
    },
    type: String,
    tomatoes: {
        viewer: {
            rating: number,
            numReviews: number,
            meter: number
        },
        lastUpdated: String
    }
};