import React, { Component } from 'react';
import './styles/App.css';
import Navigation from './containers/Navigation';
import {Route, Switch} from 'react-router-dom';
import ProductsFilter from './containers/ProductsFilter';
import ProductPage from './containers/ProductPage';
import $ from 'jquery';
import {ProductListFlux} from './containers/ProductList';
import {ProductList} from './containers/ProductList';
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
    getViewedFromLocalStorage(){
        const viewed = localStorage.getItem('viewed');
        if (viewed)
            return JSON.parse(viewed);
    }
    saveViewedToLocalStorage(product){
        const v = localStorage.getItem('viewed');
        const viewed = v ? JSON.parse(v) : [];
        const brand = product.brand;
        const model = product.model;

        //проверка если элемент уже в списке, тогда просто в начало его
        for (let i = 0; i < viewed.length; i++){
            const el = viewed[i];
            if (el.brand === brand && el.model === model){
                viewed.splice(i, 1);
                viewed.unshift(el);
                return;
            }
        }
        viewed.push(product);
        localStorage.setItem('viewed', JSON.stringify(viewed));
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
                        component={() => <ProductListFlux saveToLocalStorage={p => this.saveViewedToLocalStorage(p)}/>} 
                    />
                    <Route 
                        exact
                        path='/viewed' 
                        component={() => <ProductList 
                                            products={this.getViewedFromLocalStorage()}
                                            saveToLocalStorage={p => this.saveViewedToLocalStorage(p)}
                                        />} 
                    />
                    <Route 
                        path='/products/:name'
                        component={ProductPage}
                    />
                </Switch>
            </div>
            <div ref={el => this.$nav = $(el)} className="content hided">
                <ProductsFilter 
                    navToggle={() => this.navToggle()}
                />
            </div>      
        </div>
    );
  }
}
export default App;