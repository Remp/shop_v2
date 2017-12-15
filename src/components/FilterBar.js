import React, { Component } from 'react';
import '../styles/FilterBar.css';

class FilterBar extends Component{
    render(){
        return (
            <div className="filter-bar">
                <h3>{this.props.name}</h3>
                <ul>
                    {this.props.items}
                </ul>
            </div>
        )
    }
}
export default FilterBar;