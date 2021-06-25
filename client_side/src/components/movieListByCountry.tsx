import { useState, useEffect } from "react";
import { useParams } from "react-router";
import List from "./List";
import { moviesByCountry } from '../services/moviesApi';
import { moviesByPageNumber } from "../types/types";

interface Params {
    country: string
};

function MovieListByCountry() {

    const { country } = useParams<Params>();
    let [page, setPage] = useState<number>(0);
    let [data, setData] = useState<[moviesByPageNumber]>();
    let [count, setCount] = useState<number>(0);

    useEffect(() => {
        moviesByCountry(page, country)
            .then((res) => {
                let [count, ...movies] = res;
                setData(movies);
                setCount(count);
            })
            .catch(console.log);
    }, [page, country]);

    function handleClickPrevious() {
        if (page === 0) {
            setPage(Math.ceil((count) / 20) - 1)
        } else {
            setPage(page - 1);
        }
    };

    function handleClickNext() {
        if (page === Math.ceil((count) / 20) - 1) {
            setPage(0);
        } else {
            setPage(page + 1);
        };
    };

    if (!data) {
        return <h1>...Loading</h1>
    } else {
        return (
            <List
                data={data}
                handleClickPrevious={handleClickPrevious}
                handleClickNext={handleClickNext}
            />
        )
    };
};

export default MovieListByCountry;