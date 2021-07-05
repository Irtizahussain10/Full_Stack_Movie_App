import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { moviesById } from '../services/moviesApi';
import { moviesByObjectId } from '../types/types';

function SingleMovie() {

    interface Params {
        id: string
    };

    let { id } = useParams<Params>();
    let [data, setData] = useState<moviesByObjectId>();

    useEffect(() => {
        moviesById(id)
            .then((res) => { setData(res) })
            .catch(console.log);
    }, [id]);

    if (!data) {
        return <h1>...Loading</h1>
    } else {
        return (
            <div>
                <div>
                    {data.title ? <h4>{data.title}</h4> : null}
                    <h5>{data.year ? <span>{data.year} </span> : null}{data.rated ? <span>{data.rated}</span> : null}</h5>
                    {data.directors ? data.directors.map((director, index) => {
                        return <p key={index}>{director}</p>
                    }) : null}
                    {data.runtime ? <h6>Runtime: {Math.floor(data.runtime / 60)} hr {data.runtime % 60} min</h6> : null}
                    <p>{data.fullplot}</p>
                    {data.imdb ? <p>
                        <strong>Imdb rating: {data.imdb.rating} (from {data.imdb.votes} reviews)</strong>
                    </p> : null}
                    {data.metacritic ? <p>
                        <strong>Metacritic Rating: {data.metacritic}</strong>
                    </p> : null}
                    {data.tomatoes ? <p>
                        <strong>Tomatoes Rating: {data.tomatoes.viewer.rating} (from {data.tomatoes.viewer.numReviews} reviews)</strong>
                    </p> : null}
                </div>
                <div>
                    {data.poster ? <img src={data.poster} alt='' /> : <div>Image not found</div>}
                    {data.genres ? <div>
                        <p><strong>Genres</strong></p>
                        {data.genres.map((genre, key) => {
                            return <Link to={`/genre/${genre}`} key={key}><span>{genre} </span></Link>
                        })}
                    </div> : null}
                    {data.cast ? <div><p><strong>Cast</strong></p>
                        {data.cast.map((name, key) => {
                            return <Link to={`cast/${name}`} key={key}><span>{name} </span></Link>
                        })}</div> : null}
                    {data.writers ? <div><p><strong>Writers</strong></p>
                        {data.writers.map((name, key) => {
                            return <span key={key}>{name} </span>
                        })}</div> : null}
                    <p><strong>Comments</strong></p>
                    {data.comments[0] ? data.comments.map((comment, key) => {
                        return (
                            <div key={key}>
                                <h6>{comment.name}</h6>
                                <p>{comment.text}</p>
                            </div>
                        )
                    }) : <p><b>No comments available</b></p>}
                </div>
            </div>
        );
    };
};

export default SingleMovie;