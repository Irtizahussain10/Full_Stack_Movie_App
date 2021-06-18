import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MoviesList from './components/moviesList';
import SingleMovie from './components/singleMovie';
import Bar from './components/bar';

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
          <Route exact path='/*'>
            <MoviesList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;