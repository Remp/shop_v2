import React, { Component } from 'react';
import NavigationComponent from '../components/Navigation';
import PropTypes from 'prop-types';

class Navigation extends Component{     
    static contextTypes = {
        router: PropTypes.func.isRequired
    }  
    render(){
        const whatChecked = this.context.router.history.location.pathname;
        return (
            <NavigationComponent 
                products_click_handler={() => this.props.toggle_handler()}
                viewed_click_handler={() => this.props.viewed_click_handler()}
                whatChecked={whatChecked}
            />   
        )
    }
}
export default Navigation;