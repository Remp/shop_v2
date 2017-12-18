import React, {Component} from 'react';
import ProductListComponent from '../components/ProductList';
import Product from './Product';
import {connect} from 'react-redux';

class ProductList extends Component{
    render(){
        //парсим
        const prod = this.props.products.map(el => {
            let description = '';
            for (let c in el.parameters)
                description += `${c} ${el.parameters[c]}; `
            return <Product
                name={`${el.brand}: ${el.model}`}
                price={el.price}
                description={description}
             />
        })
        //
        return (
            <ProductListComponent 
                products={prod}                 
            />     
        )
    }
}
function stateToProps(state){
    return {
        products: state
    }
}
export default connect(stateToProps)(ProductList);