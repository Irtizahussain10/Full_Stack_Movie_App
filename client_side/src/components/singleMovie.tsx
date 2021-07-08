import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { moviesById } from '../services/moviesApi';
import { moviesByObjectId } from '../types/types';
import { LogInStatus } from "../context/LoginContext";
import { Credentials } from '../types/types';
import axios from "axios";

function SingleMovie() {

    interface Params {
        id: string
    };

    let { id } = useParams<Params>();
    let { notLoggedIn } = useContext(LogInStatus);
    let [comment, setComment] = useState<string>('');
    let [data, setData] = useState<moviesByObjectId>();
    let [reloadComments, setReload] = useState<boolean>(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!comment) {
            alert('Cannot post empty comment!');
        } else {
            (e.target as any).reset();
            let userCredentials: Credentials[] = JSON
                .parse(localStorage.getItem('userData') as string);
            let data = {
                text: comment,
                date: new Date(),
                movie_id: id,
                name: userCredentials[0]?.name,
                email: userCredentials[0]?.email
            };
            axios.post('http://localhost:5000/insertComment', data)
                .then(() => { setReload(true) })
                .catch(console.log);
        };
    };

    useEffect(() => {
        moviesById(id)
            .then((res) => { setData(res) })
            .catch(console.log);
    }, [id, reloadComments]);

    if (!data) {
        return <h1>...Loading</h1>
    } else {
        return (
            <div>
                <div>
                    {data.title ? <h4>{data.title}</h4> : null}
                    <h5>
                        {data.year ? <span>{data.year} </span>
                            : null}
                        {data.rated ? <span>{data.rated}</span> : null}
                    </h5>
                    {data.directors ? data.directors.map((director, index) => {
                        return <p key={index}>{director}</p>
                    }) : null}
                    {data.runtime ? <h6>Runtime: {Math.floor(data.runtime / 60)} hr
                        {data.runtime % 60} min </h6> : null}
                    <p>{data.fullplot}</p>
                    {data.imdb ? <p>
                        <strong>Imdb rating: {data.imdb.rating}
                            (from {data.imdb.votes} reviews)</strong>
                    </p> : null}
                    {data.metacritic ? <p>
                        <strong>Metacritic Rating: {data.metacritic}</strong>
                    </p> : null}
                    {data.tomatoes ? <p>
                        <strong>Tomatoes Rating: {data.tomatoes.viewer.rating}
                            (from {data.tomatoes.viewer.numReviews} reviews)</strong>
                    </p> : null}
                </div>
                <div>
                    {data.poster ? <img src={data.poster} alt='' />
                        : <div>Image not found</div>}
                    {data.genres ? <div>
                        <p><strong>Genres</strong></p>
                        {data.genres.map((genre, key) => {
                            return <Link to={`/genre/${genre}`} key={key}>
                                <span>{genre} </span>
                            </Link>
                        })}
                    </div> : null}
                    {data.cast ? <div><p><strong>Cast</strong></p>
                        {data.cast.map((name, key) => {
                            return <Link to={`cast/${name}`} key={key}>
                                <span>{name} </span></Link>
                        })}</div> : null}
                    {data.writers ? <div><p><strong>Writers</strong></p>
                        {data.writers.map((name, key) => {
                            return <span key={key}>{name} </span>
                        })}</div> : null}
                    <p><strong>Comments</strong></p>
                    {!notLoggedIn ?
                        <form onSubmit={handleSubmit}>
                            <textarea
                                onChange={(e) => { setComment(e.target.value) }}
                                rows={4} cols={80} maxLength={350}
                                placeholder=
                                'Post your comment her (should not exceed 350 characters)'
                            > </textarea>
                            <input type='submit' value='Post Comment' />
                        </form>
                        : <h1>Login to post comment</h1>}
                    {data.comments[0] ? data.comments.map((comment, key) => {
                        return (
                            <div key={key}>
                                <h6>{comment.name}</h6>
                                <p>
                                    <span>{comment.text}</span>
                                    <button>x</button>
                                </p>
                            </div>
                        )
                    }) : <p><b>No comments available</b></p>}
                </div>
            </div>
        );
    };
};

export default SingleMovie;