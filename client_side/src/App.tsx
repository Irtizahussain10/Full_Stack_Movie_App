import { useState } from 'react';
import { LogInStatus } from './context/LoginContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Bar from './components/bar';
import MyPortal from './components/myPortal';
import Routes from './Routes/routes';

function App() {

  let [notLoggedIn, setLoggedIn] = useState(true);
  let value = {
    notLoggedIn: notLoggedIn,
    setLoggedIn: setLoggedIn
  };

  return (
    <div className="App">
      <LogInStatus.Provider value={value}>
        <Router>
          {notLoggedIn ? <Bar /> : <MyPortal />}
          <Routes />
        </Router>
      </LogInStatus.Provider>
    </div>
  );
}

export default App;
// To handle errors use isLoading, setLoading
//redirecting user to login page if by mistake goes to logged waly pages