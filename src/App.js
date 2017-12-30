import React, { Component } from 'react';
import './styles/App.css';
import Navigation from './containers/Navigation';
import {Route, Switch} from 'react-router-dom';
import ProductsPanel from './containers/ProductsPanel';
import ProductList from './containers/ProductList';
import ProductPage from './containers/ProductPage';
import $ from 'jquery';

class App extends Component { 
    navToggle(){
        $('.content').toggleClass('hided');
    }
    render() {
        return (
        <div className="App">
            <Navigation toggle_handler={() => this.navToggle()}/>
            <div className="content">
                <Switch>
                    <Route 
                        exact
                        path='/products' 
                        component={ProductList} 
                    />
                    <Route 
                        path='/products/:name'
                        component={ProductPage}
                    />
                </Switch>
            </div>
            <div className="content hided">
                <ProductsPanel 
                    navToggle={() => this.navToggle()}
                />
            </div>      
        </div>
    );
  }
}
export default App;