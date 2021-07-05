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
    date: string,
    movie_name: [
        {
            title: string
        }
    ]
};

function MyPortal() {

    let [comments, setComments] = useState<Comments[]>([]);
    let [displayComments, setDisplay] = useState<boolean>(false);
    let [parsedCredentials, setCredentials] = useState({} as Credentials[]);
    let { setLoggedIn } = useContext(LogInStatus);
    let userCredentials = localStorage.getItem('userData');

    useEffect(() => {
        setCredentials(JSON.parse(userCredentials as string));
    }, [userCredentials]);

    function handleClick() {
        localStorage.clear();
        setLoggedIn(true);
    };

    function handleDisplay() {
        setDisplay(!displayComments);
        axios.get('http://localhost:5000/getComments', {
            data: {
                email: parsedCredentials[0].email,
                name: parsedCredentials[0].name
            }
        })
            .then((res) => { console.log(res) })
            .catch(console.log);
    };

    if (!parsedCredentials) {
        return <h1>...Loading</h1>
    } else {
        return (
            <div>
                <SearchForm />
                <Link to='/'>
                    <img src='../favicon.ico' alt='mflix' />
                    <label>Mflix</label>
                </Link>
                {
                    !displayComments ?
                        <button onClick={() => handleDisplay()}>Show Comments</button> :
                        <button onClick={() => setDisplay(!displayComments)}>Hide Comments</button>
                }
                {

                }
                <label>{parsedCredentials[0]?.name}</label>
                <button onClick={handleClick}>Signout</button>
            </div>
        );
    };
};

export default MyPortal;