import { useState, useEffect } from "react";
import List from './List';
import { moviesByPage } from '../services/moviesApi';
import { moviesByPageNumber } from '../types/types';

function MoviesList() {

    let [page, setPage] = useState(0);
    let [count, setCount] = useState<number>(0);
    let [data, setData] = useState<moviesByPageNumber[]>();

    useEffect(function () {
        moviesByPage(page)
            .then((res) => {
                let [count, ...movies] = res;
                setCount(count);
                setData([...movies]);
            })
            .catch(console.log);
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

    if (!data || !count) {
        return <h1>...Loading</h1>
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