import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogInStatus } from '../context/LoginContext';
import SearchForm from './searchForm';

interface Credentials {
    email: string,
    name: string
};

interface Comments {
    _id: string,
    text: string,
    date: string
};

function MyPortal() {

    let [parsedCredentials, setCredentials] = useState({} as Credentials);
    let [parsedComments, setComments] = useState<Comments[]>();
    let [displayComments, setDisplay] = useState(true);
    let { setLoggedIn } = useContext(LogInStatus);
    let comments = sessionStorage.getItem('userComments');
    let userCredentials = sessionStorage.getItem('userCredentials');

    useEffect(() => {
        setCredentials(JSON.parse(userCredentials as string));
        setComments(JSON.parse(comments as string));
    }, [comments, userCredentials]);

    function handleClick() {
        sessionStorage.clear();
        setLoggedIn(true);
    };

    function deleteComment(_id: string) {
        let data = {
            email: parsedCredentials.email,
            name: parsedCredentials.name,
            _id
        };
        axios.delete('http://localhost:5000/deleteComment', { data })
            .then((res) => {
                console.log(res)
                if (res.data === 1) {
                    setComments([]);
                    sessionStorage.removeItem('userComments');
                };
            })
            .catch(console.log);
    };

    if (!parsedComments || !parsedCredentials) {
        return <h1>...Loading</h1>
    } else {
        return (
            <div>
                <SearchForm />
                <Link to='/'>
                    <img src='../favicon.ico' alt='mflix' />
                    <label>Mflix</label>
                </Link>
                <button onClick={() => setDisplay(!displayComments)}>
                    {displayComments ? <label>My Comments</label> : <label>Hide Comments</label>}
                </button>
                <label>{parsedCredentials.name}</label>
                <button onClick={handleClick}>Signout</button>
                {displayComments ? <ul>
                    {parsedComments.map((comment, key) => {
                        let d = new Date(comment.date);
                        let date = d.toDateString();
                        return (
                            <div key={key}>
                                <li>{comment.text} ({date} )
                                    <button onClick={() => deleteComment(comment._id)}>x</button>
                                </li>
                            </div>
                        )
                    })}
                </ul> : null}
            </div>
        )
    };
};

export default MyPortal;