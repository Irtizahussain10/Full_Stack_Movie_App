import { useEffect, useState } from "react";
import { useParams } from "react-router";
import List from "./List";
import { moviesByPageNumber } from "../types/types";
import axios from "axios";

interface Params {
    cast: string
};

function MovieListByCast() {

    const { cast } = useParams<Params>();
    let [data, setData] = useState<moviesByPageNumber[]>([]);
    let [isLoading, setLoading] = useState<boolean>(true);
    let [connectionFailed, setConnectionFailed] = useState<boolean>(false);
    let [nothingFound, setNothingFound] = useState<boolean>(false);

    useEffect(() => {

        axios.get(`http://localhost:5000/searchMoviesByCast/${cast}`)

            .then((res) => {

                if (!res.data) {
                    let error = { message: 'Network Error' };
                    setLoading(false);
                    throw error;
                };

                if (!res.data[0]) {
                    setNothingFound(true);
                }

                setData(res.data as moviesByPageNumber[]);
                setLoading(false);

            })

            .catch((e) => {

                if (e.message === 'Network Error') {

                    setLoading(false);
                    setConnectionFailed(true);

                };

            });
    }, [cast]);

    if (isLoading) {

        return <h1>...Loading</h1>

    } else if (connectionFailed) {

        return <h1>Failed to connect to server</h1>

    } else if (nothingFound) {

        return <h1>Nothing found against this query</h1>

    } else {

        return (
            <div>
                <List data={data} />
            </div>
        );

    };
};

export default MovieListByCast;