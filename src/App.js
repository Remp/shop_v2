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
import './styles/Navigation.css';

class App extends Component { 
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    //просто показывает/прячем фильтр
    navToggler(e){
        $(e.target).toggleClass('checked');
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
    
    render() {
        return (
        <div className="App">
            <div className='navigation'>
                <div className="navbar">
                    <div className="nav-logo"><a href="#">The beast market</a></div>
                    <div className="nav-menu">
                        <ul ref={el => this.menuBar = el}>
                            <li 
                                className='nav-item c'
                                onClick={(e) => this.navToggler(e)}
                                style={{
                                    borderTop: 'transparent'
                                }}                               
                            >
                                Filter
                            </li>
                            <li className='divider'></li>
                            <li 
                                className='nav-item' 
                                onClick={(e) => this.pushTo('/viewed')}
                                id='viewed'
                            >
                                Viewed
                            </li>
                        </ul>
                    </div>
                    <div className="nav-login">
                        <div className="nav-login-avatar"></div>
                        <div className="nav-login-user">Log in</div>
                    </div>
                </div>
            </div>
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
                    navToggle={() => this.navToggle()}
                />
            </div>      
        </div>
    );
  }
}
export default App;