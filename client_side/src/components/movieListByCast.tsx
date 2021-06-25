import { useEffect, useState } from "react";
import { useParams } from "react-router";
import List from "./List";
import { moviesByCast } from "../services/moviesApi";
import { moviesByPageNumber } from "../types/types";

interface Params {
    cast: string
};

function MovieListByCast() {

    const { cast } = useParams<Params>();
    let [data, setData] = useState<moviesByPageNumber[]>();

    useEffect(() => {
        moviesByCast(cast)
            .then((res) => { setData(res) })
            .catch(console.log);
    }, [cast]);

    if (!data) {
        return <h1>...Loading</h1>
    } else {
        return (
            <div>
                <List data={data} />
            </div>
        );
    };
};

export default MovieListByCast;