import React, { Component } from 'react';
import './styles/App.css';
import Navigation from './containers/Navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProductsPanel from './containers/ProductsPanel';
import PropTypes from 'prop-types';
import ProductList from './containers/ProductList';
import {store} from './store';

class App extends Component {
  
  static contextTypes = {
    router: PropTypes.func.isRequired
  }
  bntFind_handler(){
    store.dispatch();
    this.context.router.history.push('/search');
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="content">
          <Switch>
            <Route path='/nav' component={({history}) => <ProductsPanel 
                findHandler={() => this.bntFind_handler()}
                history={history}
              /> } 
            />
            <Route 
              path='/search' 
              component={() => <ProductList/>} 
            />
          </Switch>
        </div>      
      </div>
    );
  }
}

export default App;
