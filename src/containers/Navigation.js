import React, { Component } from 'react';
import NavigationComponent from '../components/Navigation';
import PropTypes from 'prop-types';

class Navigation extends Component{
     
    static contextTypes = {
        router: PropTypes.func.isRequired
    }  
    products_click_handler(){
        const {history} = this.context.router;
        if (this.context.router.history.location.pathname === '/nav')
            history.goBack();
        else
            history.push('/nav');
        this.isExpanded = !this.isExpanded;
    }
    render(){
        return (
            <NavigationComponent 
                products_click_handler={() => this.products_click_handler()}
            />   
        )
    }
}
export default Navigation;