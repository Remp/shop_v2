import React, { Component } from 'react';
import './styles/App.css';
import Navigation from './containers/Navigation';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
      </div>
    );
  }
}

export default App;
