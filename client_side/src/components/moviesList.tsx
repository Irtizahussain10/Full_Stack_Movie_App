import { useState, useEffect } from "react";
import axios from "axios";
import List from './List';
import { moviesByPageNumber } from '../types/types';

function MoviesList() {

    let [page, setPage] = useState(0);
    let [count, setCount] = useState<number>(0);
    let [data, setData] = useState<moviesByPageNumber[]>([]);
    let [isLoading, setLoading] = useState<boolean>(true);
    let [connectionFailed, setConnectionFailed] = useState<boolean>(false);
    let [nothingFound, setNothingFound] = useState<boolean>(false);

    useEffect(function () {

        axios.get(`http://localhost:5000/allMovies/${page}`)

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

                setLoading(false);
                let [count, ...movies]
                    : [number, ...moviesByPageNumber[]] = res.data;
                setCount(count);
                setData([...movies]);

            })

            .catch((e) => {

                if (e.message === 'Network Error') {

                    setLoading(false);
                    setConnectionFailed(true);

                };

            });
    }, [page]);

    function handleClickPrevious() {

        if (page === 0) {
            setPage(Math.ceil((count) / 20) - 1);
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

        return <h1>Connection with the server failed</h1>

    } else if (nothingFound) {

        return <h1>Nothing found against this query</h1>

    } else {

        return (

            <div>
                <List
                    data={data}
                    handleClickPrevious={handleClickPrevious}
                    handleClickNext={handleClickNext}
                />
            </div>

        );
    };
};

export default MoviesList;