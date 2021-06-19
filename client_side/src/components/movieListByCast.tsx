import { useEffect } from "react";
import { useParams } from "react-router";
import { moviesByCast } from "../services/moviesApi";

function MovieListByCast() {

    interface Params {
        cast: string
    };

    const { cast } = useParams<Params>();

    useEffect(() => {
        moviesByCast(cast)
            .then(console.log)
            .catch(console.log);
    }, [cast]);

    return (
        <div>

        </div>
    )
};

export default MovieListByCast;