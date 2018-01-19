import React, { Component } from 'react';
import ProductsPanel from '../containers/ProductsFilter';
import '../styles/Navigation.css';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Navigation extends Component{
    render(){
        return (
            <div className='navigation'>
                <div className="navbar">
                    <div className="nav-logo"><a href="#">The beast market</a></div>
                    <div className="nav-menu">
                        <ul ref={el => this.menuBar = el}>
                            <li 
                                className={this.props.whatChecked === 'filter' ? 'nav-item checked': 'nav-item' }
                                onClick={(e) => this.props.navToggler(e)}
                                style={{
                                    borderTop: 'transparent'
                                }}
                            >
                                Filter
                            </li>
                            <li className='divider'></li>
                            <li 
                                className={this.props.whatChecked === 'viewed' ? 'nav-item checked': 'nav-item' } 
                                onClick={(e) => this.props.pushTo('/viewed')}
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