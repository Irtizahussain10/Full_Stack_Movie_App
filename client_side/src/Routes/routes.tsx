import { Switch, Route } from 'react-router-dom';
import MoviesList from '../components/moviesList';
import SingleMovie from '../components/singleMovie';
import MovieListByCountry from '../components/movieListByCountry';
import MovieListByGenre from '../components/movieListByGenre';
import MovieListByCast from '../components/movieListByCast';
import SearchResults from '../components/searchResult';
import LogIn from '../components/userLogin';
import SignUp from '../components/signUp';
import { useContext } from 'react';
import { LogInStatus } from '../context/LoginContext';

function Routes() {

    let { notLoggedIn } = useContext(LogInStatus);

    return (
        <Switch>

            <Route exact path='/'>
                <MoviesList />
            </Route>

            <Route exact path='/userLogin'>
                {notLoggedIn ? <LogIn /> : <MoviesList />}
            </Route>

            <Route exact path='/SignUp'>
                {notLoggedIn ? <SignUp /> : <MoviesList />}
            </Route>

            <Route exact path='/movieByID/:id'>
                <SingleMovie />
            </Route>

            <Route exact path='/countries/:country'>
                <MovieListByCountry />
            </Route>

            <Route exact path='/cast/:cast'>
                <MovieListByCast />
            </Route>

            <Route exact path='/genre/:genre'>
                <MovieListByGenre />
            </Route>

            <Route exact path='/text/:text'>
                <SearchResults />
            </Route>

            <Route exact path='/*'>
                <h1>Oops! the page is not available</h1>
            </Route>

        </Switch>
    );
};

export default Routes;