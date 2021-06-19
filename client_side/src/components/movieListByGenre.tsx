import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { moviesByGenre } from "../services/moviesApi";

function MovieListByGenre() {

    interface Params {
        genre: string
    };

    let { genre } = useParams<Params>();
    let [page, setPage] = useState<number>(0);

    useEffect(() => {
        moviesByGenre(page, genre)
            .then(console.log)
            .catch(console.log)
    }, [genre]);

    return (
        <div>

        </div>
    );
};

export default MovieListByGenre;