import { Link } from 'react-router-dom';
import SearchForm from './searchForm';

function Bar() {

    return (
        <div>
            <SearchForm />
            <Link to='/' >
                <img src='../favicon.ico' alt='mflix' />
                <label>Mflix</label>
            </Link>
            <Link to='/userLogin'>
                <label>Login</label>
            </Link>
            <Link to='/SignUp'>
                <label>Signup</label>
            </Link>
        </div>
    );
};

export default Bar;