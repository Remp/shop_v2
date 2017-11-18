import React, { Component } from 'react';
import NavigationComponent from '../components/Navigation';

class Navigation extends Component{
    constructor(){
        super();
        this.state = {
            isExpanded: false
        }
    }   
    products_click_handler(){
        this.setState({isExpanded: !this.state.isExpanded});
    }
    render(){
        return (
            <NavigationComponent 
                products_click_handler={() => this.products_click_handler()}
                isExpanded={this.state.isExpanded}
            />   
        )
    }
}
export default Navigation;