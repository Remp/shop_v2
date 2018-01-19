import React, { Component } from 'react';
import NavigationComponent from '../components/Navigation';
import PropTypes from 'prop-types';

class Navigation extends Component{     
    static contextTypes = {
        router: PropTypes.func.isRequired
    }  
    pushTo(way){
        const {history} = this.context.router;
        history.push(way);
    }
    render(){
        return (
            <NavigationComponent 
                pushTo={(way) => this.pushTo(way)}
                whatChecked={this.props.whatChecked}
                navToggler={(e) => this.props.navToggler(e)}
            />   
        )
    }
}
export default Navigation;