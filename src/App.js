import React, { Component } from 'react';
import './styles/App.css';
import Navigation from './containers/Navigation';
import {Route, Switch} from 'react-router-dom';
import ProductsPanel from './containers/ProductsPanel';
import ProductPage from './containers/ProductPage';
import $ from 'jquery';
import {ProductListFlux} from './containers/ProductList';
import PropTypes from 'prop-types';

class App extends Component { 
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    navToggle(){
        this.$nav.toggleClass('hided');
        this.$other.toggleClass('hided');
    }
    viewed_click_handler(){
        const {history} = this.context.router;
        history.push('/viewed');
        this.$nav.addClass('hided');
        this.$other.removeClass('hided');
    }
    render() {
        return (
        <div className="App">
            <Navigation 
                toggle_handler={() => this.navToggle()}
                viewed_click_handler={() => this.viewed_click_handler()}
            />
            <div ref={el => this.$other = $(el)} className="content">
                <Switch>
                    <Route 
                        exact
                        path='/products' 
                        component={ProductListFlux} 
                    />
                    <Route 
                        path='/products/:name'
                        component={ProductPage}
                    />
                </Switch>
            </div>
            <div ref={el => this.$nav = $(el)} className="content hided">
                <ProductsPanel 
                    navToggle={() => this.navToggle()}
                />
            </div>      
        </div>
    );
  }
}
export default App;