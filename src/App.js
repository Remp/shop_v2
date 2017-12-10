import React, { Component } from 'react';
import './styles/App.css';
import Navigation from './containers/Navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProductsPanel from './containers/ProductsPanel';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Switch>
            <Route path='/nav' component={ProductsPanel} />
          </Switch>
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
