import React, { Component } from 'react';
import '../styles/CategoryName.css';
import 'font-awesome/css/font-awesome.min.css';

class CategoryName extends Component{
    render(){
        return (
            <li 
                className={this.props.isChecked ? 'checked category-item' : 'category-item'} 
                onClick={() => this.props.onClick_handler()}
            >
                <i className={this.props.faclass} />{this.props.name}
            </li>
        )
    }
}
export default CategoryName;