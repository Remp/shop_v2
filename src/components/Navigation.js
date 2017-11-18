import React, { Component } from 'react';
import ProductsPanel from '../containers/ProductsPanel';
import '../styles/Navigation.css';

class Navigation extends Component{   
    render(){
        return (
            <div className='navigation'>
                <div className="navbar">
                    <div className="nav-logo"><a href="#">The beast market</a></div>
                    <div className="nav-menu">
                        <ul>
                            <li onClick={() => this.props.products_click_handler()}>Products</li>
                        </ul>
                    </div>
                    <div className="nav-login">
                        <div className="nav-login-avatar"></div>
                        <div className="nav-login-user">Log in</div>
                    </div>
                </div>
                <ProductsPanel isExpanded={this.props.isExpanded} />                      
            </div>
        )
    }
}
export default Navigation;