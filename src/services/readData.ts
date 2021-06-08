import { movies } from '../types/types';

const uri = 'http://localhost:5000';

export const readData = async () => {
    const response = await fetch(uri);
    let data: movies = await response.json();
};