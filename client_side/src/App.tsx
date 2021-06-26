import { BrowserRouter as Router } from 'react-router-dom';
import Bar from './components/bar';
import Routes from './Routes/routes';

function App() {

  return (
    <div className="App">
      <Router>
        <Bar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;