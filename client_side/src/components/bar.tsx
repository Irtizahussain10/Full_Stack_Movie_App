import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogInStatus } from '../context/LoginContext';
import SearchForm from './searchForm';

function Bar() {

    let { notLoggedIn } = useContext(LogInStatus);

    return (
        <div>
            <SearchForm />
            <Link to='/' >
                <img src='../favicon.ico' alt='mflix' />
                <label>Mflix</label>
            </Link>
            {notLoggedIn ? <Link to='/userLogin'>
                <label>Login</label>
            </Link> : null}
            {notLoggedIn ? <Link to='/SignUp'>
                <label>Signup</label>
            </Link> : null}
        </div>
    );
};

export default Bar;