import React, {Component} from 'react';
import '../styles/ProductsList.css'

class ProductList extends Component{
    render(){
        return (
            <div className="products-list">
                    {this.props.products}
            </div>
        )
    }
}
export default ProductList;