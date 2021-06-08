import React from 'react';
import { readData } from './services/readData';

class App extends React.Component {
  render() {
    readData();
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;