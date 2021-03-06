import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogInStatus } from '../context/LoginContext';
import SearchForm from './searchForm';
import { Credentials, Comments } from '../types/types';
import '../css/bar.css';

function MyPortal() {

    let [comments, setComments] = useState<Comments[]>([]);
    let [displayComments, setDisplay] = useState<boolean>(false);
    let [parsedCredentials, setCredentials] = useState<Credentials[]>([]);
    let { setLoggedIn } = useContext(LogInStatus);
    let userCredentials = localStorage.getItem('userData');

    useEffect(() => {
        setCredentials(JSON.parse(userCredentials as string));
    }, [userCredentials]);

    function handleClick() {

        localStorage.removeItem('userData');
        localStorage.setItem('notLoggedIn', JSON.stringify(true));
        setLoggedIn(
            JSON.parse(localStorage
                .getItem('notLoggedIn') as string)
        );

    };

    function handleDisplay() {

        setDisplay(!displayComments);

        let data = {
            email: parsedCredentials[0]?.email,
            name: parsedCredentials[0]?.name
        };

        axios.post('http://localhost:5000/getComments', data)

            .then((res) => {

                if (!res.data) {
                    let error = { message: 'Network Error' };
                    throw error;
                };

                setComments(res.data);

            })

            .catch((e) => { alert(e) });
    };

    if (!parsedCredentials) {

        return <h1>...Loading</h1>

    } else {

        return (
            <div className='bar'>
                <SearchForm />
                <Link to='/'>
                    <img src='../favicon.ico' alt='mflix' />
                    <label>Mflix</label>
                </Link>
                {
                    !displayComments ?
                        <button onClick={() => handleDisplay()}>
                            Show Comments
                        </button> :
                        <button onClick={() => setDisplay(!displayComments)}>
                            Hide Comments
                        </button>
                }
                {
                    comments && displayComments ?
                        comments.map((comment, key) => {
                            let d = new Date(comment.date);
                            let date = d.toDateString();
                            if (!comments[0]) {
                                return <p>No comments to show</p>
                            } else {
                                return <p key={key}>
                                    <span>{comment.text}</span>
                                    <Link to={`/${comment.movie_name[0]._id}`}>
                                        <span>
                                            ({comment.movie_name[0].title})
                                        </span>
                                    </Link>
                                    <span>
                                        ({date})
                                    </span>
                                </p>
                            }
                        }) : null
                }
                <label>{parsedCredentials[0]?.name}</label>
                <button onClick={handleClick}>Signout</button>
            </div>
        );
    };
};

export default MyPortal;