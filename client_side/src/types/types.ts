export interface moviesByPageNumber {
    _id: string,
    title: string,
    cast: string[],
    rated: string,
    year: number,
    imdb: {
        rating: number,
        votes: number,
        id: number
    },
    poster?: string
};

export interface moviesByObjectId {
    title: string,
    year: number,
    rated: number,
    directors: string[],
    fullplot: string,
    imdb: {
        rating: number,
        votes: number,
        id: number
    },
    metacritic: number,
    tomatoes: {
        website: string,
        viewer: {
            rating: number,
            numReviews: number,
            meter: number
        },
        dvd: Date,
        critic: {
            rating: number,
            numReviews: number,
            meter: number
        },
        lastUpdated: Date,
        rotten: number,
        production: string,
        fresh: number
    },
    poster?: string,
    cast: string[],
    genres: string[],
    writers: string[],
    comments: comments[]
};

interface comments {
    name: string,
    text: string
}