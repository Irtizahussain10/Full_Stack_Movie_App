import { moviesByPageNumber, moviesByObjectId } from '../types/types';

export async function moviesByPage(pageNumber: number) {
    let uri = `http://localhost:5000/allMovies/${pageNumber}`;
    let response = await fetch(uri);
    let data: [number,...moviesByPageNumber[]] = await response.json();
    return data;
};

export async function moviesById(id: string) {
    let uri = `http://localhost:5000/searchMoviesById/${id}`;
    let response = await fetch(uri);
    let data: [moviesByObjectId] = await response.json();
    return data[0];
};

export async function moviesByCountry(page: number, country: string) {
    let uri = `http://localhost:5000/searchMoviesByCountry/${country}/${page}`;
    let response = await fetch(uri);
    let data: [number, ...moviesByPageNumber[]] = await response.json();
    return data;
};

export async function moviesByCast(cast: string) {
    let uri = `http://localhost:5000/searchMoviesByCast/${cast}`;
    let response = await fetch(uri);
    let data: moviesByPageNumber[] = await response.json();
    return data;
};

export async function moviesByGenre(page: number, genre: string) {
    let uri = `http://localhost:5000/searchMoviesByGenre/${genre}/${page}`;
    let response = await fetch(uri);
    let data: [number, ...moviesByPageNumber[]] = await response.json();
    return data;
};

export async function moviesByText(text: string, page: number) {
    let uri = `http://localhost:5000/textSearch/${text}/${page}`;
    let response = await fetch(uri);
    let data: [number, ...moviesByPageNumber[]] = await response.json();
    return data;
};