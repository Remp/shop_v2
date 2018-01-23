import React, { Component } from 'react';
import '../styles/Navigation.css';
import {connect} from 'react-redux';
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
                                className='nav-item c'
                                onClick={() => this.props.navToggler(this.$filter)}
                                style={{
                                    borderTop: 'transparent'
                                }}   
                                ref={el => this.$filter = $(el)}                            
                            >
                                <i class="fa fa-filter" aria-hidden="true"></i>
                            </li>
                            <li className='divider'></li>
                            <li 
                                className='nav-item' 
                                onClick={(e) => this.props.pushTo('/products')}
                                id='products'
                            >
                                Products
                            </li>
                            <li className='divider'></li>
                            <li 
                                className='nav-item' 
                                onClick={(e) => this.props.pushTo('/viewed')}
                                id='viewed'
                            >
                                Viewed
                            </li>
                        </ul>
                    </div>
                    <div 
                        onClick={() => this.props.toggleAuthForm()} 
                        className={this.props.isAuthFormExpanded ? 'nav-login checked' : 'nav-login'}
                    >
                        <div className="nav-login-avatar"></div>
                        <div className="nav-login-user">
                            {
                                this.props.username || 'Sign in'
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function stateToProps(state){
    return{
        username: state.user.name
    }
}
export default connect()(Navigation);