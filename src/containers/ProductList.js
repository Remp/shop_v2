import React, {Component} from 'react';
import ProductListComponent from '../components/ProductList';
import Product from './Product';
import {connect} from 'react-redux';

class ProductList extends Component{
    onClick_handler(path){
        this.props.history.push(`/${path}`)
    }
    render(){
        //парсим
        const prod = this.props.products.map(el => {
            let description = '';
            for (let c in el.parameters)
                description += `${c}: ${el.parameters[c]}; `;
            const name = `${el.brand} ${el.model}`;
            const path = `${el.brand}_${el.model}`
            return <Product
                name={name}
                price={el.price}
                description={description}
                onClick={() => this.onClick_handler(path)}
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
        products: state.products
    }
}
export default connect(stateToProps)(ProductList);