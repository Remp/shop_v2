import React, { Component } from 'react';
import ProductsPanel from '../containers/ProductsFilter';
import '../styles/Navigation.css';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Navigation extends Component{
    constructor(){
        super();
        this.state = {
            current: ''
        }
    }
    componentDidMount(){
        this.setState({current: this.props.whatChecked})
    }
    products_click_handler(e){
        $(e.target).toggleClass('checked');
        this.props.products_click_handler();
    } 
    viewed_click_handler(e){
        this.setState({current: '/viewed'})
        this.props.viewed_click_handler();
    }  
    render(){
        return (
            <div className='navigation'>
                <div className="navbar">
                    <div className="nav-logo"><a href="#">The beast market</a></div>
                    <div className="nav-menu">
                        <ul ref={el => this.menuBar = el}>
                            <li 
                                className={this.state.current === '/products' ? 'nav-item checked': 'nav-item' }
                                onClick={(e) => this.products_click_handler(e)}
                                style={{
                                    borderTop: 'transparent'
                                }}
                            >
                                Filter
                            </li>
                            <li className='divider'></li>
                            <li 
                                className={this.state.current === '/viewed' ? 'nav-item checked': 'nav-item' } 
                                onClick={(e) => this.viewed_click_handler(e)}
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
        )
    }
}
export default Navigation;