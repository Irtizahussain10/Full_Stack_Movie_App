import { useEffect, useState } from "react";
import { useParams } from "react-router";
import List from "./List";
import { moviesByText } from "../services/moviesApi";
import { moviesByPageNumber } from "../types/types";

interface Params {
    text: string
};

function SearchResults() {

    let { text } = useParams<Params>();
    let [page, setPage] = useState(0);
    let [data, setData] = useState<moviesByPageNumber[]>();
    let [count, setCount] = useState<number>(0);

    useEffect(() => {
        moviesByText(text, page)
            .then((res) => {
                let [count, ...movies] = res;
                setData(movies);
                setCount(count);
                console.log(count,movies, page);
            })
            .catch((e) => { console.log(e) });
    }, [page, text]);

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
                handleClickNext={handleClickNext}
                handleClickPrevious={handleClickPrevious}
            />
        );
    }
};

export default SearchResults;