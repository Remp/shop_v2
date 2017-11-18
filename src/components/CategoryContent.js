import React, { Component } from 'react';
import { categories } from '../categories.js';
import '../styles/CategoryContent.css';

class CategoryContent extends Component{
    render(){
        return (
            <div className="categories-content">
                <div className="brands">
                    {this.props.brands}                                     
                </div>
                <div className="filter">
                    {this.props.filter_bars}
                </div>
            </div>
        )
    }
}
export default CategoryContent;