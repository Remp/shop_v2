import React, { Component } from 'react';
import FilterItemComponent from '../components/FilterItem';

class FilterItem extends Component{
    onClick_handler(e){
        const { name, category, parent } = this.props;
        this.props.onChecking(parent, category, name);
    }
    render(){
        return (
            <FilterItemComponent
                isChecked={this.props.isChecked}
                name={this.props.name}
                onClick_handler={() => this.onClick_handler()}
            /> 
        )
    }
}
export default FilterItem;