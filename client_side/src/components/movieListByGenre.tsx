import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import List from "./List";
import { moviesByPageNumber } from "../types/types";

interface Params {
    genre: string
};

function MovieListByGenre() {

    let { genre } = useParams<Params>();
    let [page, setPage] = useState<number>(0);
    let [count, setCount] = useState<number>(0);
    let [data, setData] = useState<moviesByPageNumber[]>([]);
    let [isLoading, setLoading] = useState<boolean>(true);
    let [connectionFailed, setConnectionFailed] = useState<boolean>(false);
    let [nothingFound, setNothingFound] = useState<boolean>(false);

    useEffect(() => {

        axios.get(`http://localhost:5000/searchMoviesByGenre/${genre}/${page}`)

            .then((res) => {

                if (!res.data) {
                    let error = { message: 'Network Error' };
                    setLoading(false);
                    throw error;
                };

                if (res.data[0] === 0) {
                    setNothingFound(true);
                    setLoading(false);
                };

                let [count, ...movies]
                    : [number, ...moviesByPageNumber[]] = res.data;
                setCount(count);
                setData(movies);
                setLoading(false);

            })

            .catch((e) => {

                if (e.message === 'Network Error') {

                    setLoading(false);
                    setConnectionFailed(true);

                };

            })
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

    if (isLoading) {

        return <h1>...Loading</h1>

    } else if (connectionFailed) {

        return <h1>Failed to connect to server</h1>

    } else if (nothingFound) {

        return <h1>Nothing found against this query</h1>

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