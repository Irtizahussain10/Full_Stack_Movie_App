import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { moviesByCountry } from '../services/moviesApi';
import { moviesByPageNumber } from "../types/types";

function MovieListByCountry() {

    interface Params {
        country: string
    };

    const { country } = useParams<Params>();
    let [page, setPage] = useState<number>(0);
    let [data, setData] = useState<[moviesByPageNumber]>();
    let [count, setCount] = useState<number>();

    useEffect(() => {
        moviesByCountry(page, country)
            .then((res) => {
                let [count, ...movies] = res;
                setData(movies);
                setCount(count);
            })
            .catch(console.log);
    }, [page]);

    function handleClickPrevious() {
        if (page === 0) {
            setPage(Math.ceil((count || 11846) / 20) - 1)
        } else {
            setPage(page - 1);
        }
    };

    function handleClickNext() {
        if (page === Math.ceil((count || 10000) / 20) - 1) {
            setPage(0);
        } else {
            setPage(page + 1);
        };
    };

    if (!data) {
        return <h1>...Loading</h1>
    } else {
        return (
            <div>
                <ul>
                    {data.map((movie, key) => {
                        return (
                            <Link key={key} to={`/${movie._id}`}>
                                <li>{movie.title}</li>
                            </Link>
                        )
                    })}
                </ul>
                <button onClick={handleClickPrevious}>Previous</button>
                <button onClick={handleClickNext}>Next</button>
            </div>
        )
    };
};

export default MovieListByCountry;