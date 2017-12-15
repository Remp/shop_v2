import React, {Component} from 'react';

class Product extends Component{
    render(){
        return (
            <div style={{backgroundImage: this.props.image}} className="product">
                <div className="product-content">
                    <div className="product-title">{this.props.name}</div>
                    <div className="product-description"></div>
                </div>
            </div>
        )
    }
}
export default Product;