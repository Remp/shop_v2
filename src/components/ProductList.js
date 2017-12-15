import React, {Component} from 'react';

class ProductList extends Component{
    render(){
        return (
            <div className="product-list">
                {this.props.products}
            </div>
        )
    }
}
export default ProductList;