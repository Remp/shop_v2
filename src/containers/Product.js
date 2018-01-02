import React, {Component} from 'react';
import ProductComponent from '../components/Product';
import PropTypes from 'prop-types';

class Product extends Component{
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    onClick_handler(){
        this.context.router.history.push(`/products/${this.props.path}`)
    }
    render(){
        return (
            <ProductComponent 
                image={this.props.image} 
                name={this.props.name} 
                description={this.props.description}
                price={this.props.price}
                onClick={() => this.onClick_handler()}
            />
        )
    }
}
export default Product;