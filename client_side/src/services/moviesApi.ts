import { moviesByPageNumber, moviesByObjectId } from '../types/types';

export async function moviesByPage(pageNumber: number) {
    let uri = `http://localhost:5000/allMovies/${pageNumber}`;
    let response = await fetch(uri);
    let data: [number, moviesByPageNumber] = await response.json();
    return data;
};

export async function moviesById(id: string) {
    let uri = `http://localhost:5000/searchMoviesById/${id}`;
    let response = await fetch(uri);
    let data: [moviesByObjectId] = await response.json();
    return data[0];
};