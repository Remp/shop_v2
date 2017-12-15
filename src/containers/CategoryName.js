import React, { Component } from 'react';
import CategoryNameComponent from '../components/CategoryName';

class CategoryName extends Component{
    onClick_handler(){
        this.props.check_handler(this.props.category);
    }
    render(){
        const isChecked = this.props.check_list[this.props.category].isChecked;
        return (
            <CategoryNameComponent 
                isChecked={isChecked}
                onClick_handler={() => this.onClick_handler()}
                faclass={this.props.faclass}
                name={this.props.name}
            />
        )
    }
}
export default CategoryName;