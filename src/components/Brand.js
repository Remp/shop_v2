import React, { Component } from 'react';
import '../styles/Brand.css';

class Brand extends Component{
    render(){
        return (
            <div 
                onClick={(e) => this.props.onClick_handler(e)} 
                className={this.props.isChecked ? 'brand checked' : 'brand'}
            >
                <img src={this.props.img} alt={this.props.name}/>
            </div>
        )
    }
}
export default Brand;