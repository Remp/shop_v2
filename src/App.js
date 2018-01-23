import React, { Component } from 'react';
import './styles/App.css';
import Navigation from './components/Navigation';
import {Route, Switch} from 'react-router-dom';
import ProductsFilter from './containers/ProductsFilter';
import ProductPage from './containers/ProductPage';
import $ from 'jquery';
import {ProductListFlux} from './containers/ProductList';
import {ProductList} from './containers/ProductList';
import PropTypes from 'prop-types';
import './styles/Navigation.css';
import AuthForm from './containers/AuthForm';
import interactions from './interactions';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component { 
    constructor(){
        super();
        this.state = {
            isAuthFormExpanded: false
        }
    }
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    //просто показывает/прячем фильтр
    navToggler($filter){
        $filter.toggleClass('checked');
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
        return viewed ? JSON.parse(viewed) : [];
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
    onTab_enter(way){
        $('.nav-item').not('.c').css({color: 'white'})
        $(`#${way}`).css({color: '#EB1717'})
    }   
    pushTo(way){
        const {history} = this.context.router;
        history.push(way);
    }
    toggleAuthForm(){
        this.setState({
            isAuthFormExpanded: !this.state.isAuthFormExpanded
        })
    }
    render() {
        return (
        <div className="App">
            <Navigation
                navToggler={(f) => this.navToggler(f)}
                pushTo={(way) => this.pushTo(way)}
                toggleAuthForm={() => this.toggleAuthForm()}
                isAuthFormExpanded={this.state.isAuthFormExpanded}
            />
            <div ref={el => this.$other = $(el)} className="content">
                <Switch>
                    <Route 
                        exact
                        path='/products' 
                        component={() => <ProductListFlux 
                                saveToLocalStorage={p => this.saveViewedToLocalStorage(p)}
                                onMount={() => this.onTab_enter('products')}
                            />
                        }
                        id='products'
                    />
                    <Route 
                        exact
                        path='/viewed' 
                        component={() => 
                             <ProductList 
                                products={this.getViewedFromLocalStorage()}
                                saveToLocalStorage={p => this.saveViewedToLocalStorage(p)}
                                onMount={() => this.onTab_enter('viewed')}
                            />}
                    />
                    <Route 
                        path='/products/:name'
                        component={() => <ProductPage onMount={() => this.onTab_enter('products')}/>}
                    />
                </Switch>
            </div>
            <div ref={el => this.$nav = $(el)} className="content hided">
                <ProductsFilter 
                    navToggle={() => this.navToggler()}
                />
            </div>  
            {
                this.state.isAuthFormExpanded
                ?
                <AuthForm 
                    isExpanded={this.state.isAuthFormExpanded}
                />
                : 
                null
            }
           
        </div>
    );
  }
}
export default App;