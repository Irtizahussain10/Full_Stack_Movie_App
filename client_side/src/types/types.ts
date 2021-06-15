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
}