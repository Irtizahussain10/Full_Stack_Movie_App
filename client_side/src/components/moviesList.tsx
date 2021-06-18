import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { moviesByPage } from '../services/moviesApi';
import { moviesByPageNumber } from '../types/types';

function MoviesList() {

    let [page, setPage] = useState(0);
    let [count, setCount] = useState<number>();
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
            setPage(Math.ceil((count || 23530) / 20));
        } else {
            setPage(page - 1);
        };
    };

    function handleClickNext() {
        if (page === Math.ceil((count || 23530 / 20))) {
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
                {data.map((element, index) => {
                    return <Link to={`/${element._id}`} key={index} >
                        {element.poster ? <img src={element.poster} alt=''></img> : <div>Poster Not Available</div>}
                        {<h4>{element.title}</h4>}
                        <h5><span>{element.year} </span><span>{element.rated}</span></h5>
                        <h5>{element.cast?.map((actor, key) => {
                            return <span key={key}>{actor} </span>
                        })}</h5>
                        <h6>{element.imdb?.rating}</h6>
                    </Link>
                })}
                <button onClick={handleClickPrevious}>Previous</button>
                <button onClick={handleClickNext}>Next</button>
            </div>
        );
    };
};

export default MoviesList;