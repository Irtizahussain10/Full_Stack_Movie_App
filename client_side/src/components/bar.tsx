import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogInStatus } from '../context/LoginContext';
import SearchForm from './searchForm';
import '../css/bar.css';

function Bar() {

    let { notLoggedIn } = useContext(LogInStatus);

    return (

        <div className='bar'>
            <SearchForm />
            <Link to='/' className='title'>
                <img src='../favicon.ico' alt='mflix' />
                <label className='label'>Mflix</label>
            </Link>
            <div>
                {notLoggedIn ? <Link to='/userLogin'>
                    <label className='label'>Login</label>
                </Link> : null}
                {notLoggedIn ? <Link to='/SignUp'>
                    <label className='label'>Signup</label>
                </Link> : null}
            </div>
        </div>
    );
};

export default Bar;