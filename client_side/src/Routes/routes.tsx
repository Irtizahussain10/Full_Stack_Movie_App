import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MoviesList from '../components/moviesList';
import SingleMovie from '../components/singleMovie';
import MovieListByCountry from '../components/movieListByCountry';
import MovieListByGenre from '../components/movieListByGenre';
import MovieListByCast from '../components/movieListByCast';
import SearchResults from '../components/searchResult';
import LogIn from '../components/userLogin';
import SignUp from '../components/signUp';

function Routes() {
    return (
        <Switch>

            <Route exact path='/'>
                <MoviesList />
            </Route>

            <Route exact path='/userLogin'>
                <LogIn />
            </Route>

            <Route exact path='/SignUp'>
                <SignUp />
            </Route>

            <Route exact path='/:id'>
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
                <MoviesList />
            </Route>

        </Switch>
    );
};

export default Routes;