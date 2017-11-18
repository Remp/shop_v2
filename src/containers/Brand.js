import React, { Component } from 'react';
import BrandComponent from '../components/Brand';

class Brand extends Component{
    onClick_handler(e){
        const { name, category, parent } = this.props;
        this.props.onChecking(parent, category, name);
    }
    render(){
        return (
            <BrandComponent
                onClick_handler={() => this.onClick_handler()}
                isChecked={this.props.isChecked}
                img={this.props.img}
                name={this.props.name}
            />
        )
    }
}
export default Brand;