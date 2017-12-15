import React, { Component } from 'react';
import '../styles/FilterItem.css'

class FilterItem extends Component{
    render(){
        return (
            <li 
                className={this.props.isChecked ? 'checked item' : 'item'} 
                data-category={this.props.name}
                onClick={() => this.props.onClick_handler()}
            >
                {this.props.name}
            </li>
        )
    }
}
export default FilterItem;