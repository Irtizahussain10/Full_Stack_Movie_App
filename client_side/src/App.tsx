import { useState } from 'react';
import { LogInStatus } from './context/LoginContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Bar from './components/bar';
import MyPortal from './components/myPortal';
import Routes from './Routes/routes';

function App() {

  if (!localStorage.getItem('userData')) {

    localStorage.setItem(
      'notLoggedIn', JSON.stringify(true)

    );

  } else if (!!localStorage
    .getItem('userData')) {

    localStorage.setItem(
      'notLoggedIn', JSON.stringify(false)

    );
  };

  let [notLoggedIn, setLoggedIn] = useState<boolean>(
    JSON.parse(
      localStorage.getItem('notLoggedIn') as string
    )
  );

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