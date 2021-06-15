import { moviesByPageNumber } from '../types/types';

export async function moviesByPage(pageNumber: number) {
    let uri = `http://localhost:5000/allMovies/${pageNumber}`;
    let response = await fetch(uri);
    let data: [number, moviesByPageNumber] = await response.json();
    return data;
};