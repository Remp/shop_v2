import React, {Component} from 'react';
import ProductComponent from '../components/Product';

class Product extends Component{
    render(){
        return (
            <ProductComponent 
                image={this.props.image} 
                name={this.props.name} 
                description={this.props.description}
                price={this.props.price}
                onClick={() => this.props.onClick()}
            />
        )
    }
}
export default Product;