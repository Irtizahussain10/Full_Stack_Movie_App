import { useEffect, useState } from "react";
import { useParams } from "react-router";
import List from "./List";
import { moviesByGenre } from "../services/moviesApi";
import { moviesByPageNumber } from "../types/types";

interface Params {
    genre: string
};

function MovieListByGenre() {

    let { genre } = useParams<Params>();
    let [page, setPage] = useState<number>(0);
    let [count, setCount] = useState<number>(0);
    let [data, setData] = useState<moviesByPageNumber[]>([]);

    useEffect(() => {
        moviesByGenre(page, genre)
            .then((res) => {
                let [count, ...movies] = res;
                setCount(count);
                setData(movies);
            })
            .catch(console.log)
    }, [page, genre]);

    function handleClickPrevious() {
        if (page === 0) {
            setPage(Math.ceil((count) / 20) - 1)
        } else {
            setPage(page - 1);
        };
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
        );
    };
};

export default MovieListByGenre;