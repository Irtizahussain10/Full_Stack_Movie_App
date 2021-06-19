import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MoviesList from './components/moviesList';
import SingleMovie from './components/singleMovie';
import MovieListByCountry from './components/movieListByCountry';
import MovieListByGenre from './components/movieListByGenre';
import Bar from './components/bar';
import MovieListByCast from './components/movieListByCast';

function App() {

  return (
    <div className="App">
      <Router>

        <Bar />

        <Switch>

          <Route exact path='/'>
            <MoviesList />
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

          <Route exact path='/*'>
            <MoviesList />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;