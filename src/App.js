import React, { Component } from 'react';
import './styles/App.css';
import Navigation from './Navigation';
import $ from 'jquery';


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
