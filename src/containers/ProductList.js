import React, {Component} from 'react';
import ProductListComponent from '../components/ProductList';
import Product from './Product';
import {connect} from 'react-redux';
import images from '../images';

export class ProductList extends Component{
    render(){
        //парсим
        let prod = this.props.products.map(el => {
            let description = '';
            for (let c in el.parameters)
                description += `${c}: ${el.parameters[c]}; `;
            const name = `${el.brand} ${el.model}`;
            const path = `${el.brand}_${el.model.replace(' ', '_')}`;
            //получить первое изображение
            const image = images[name][0];
            return <Product
                name={name}
                price={el.price}
                description={description}
                path={path}
                image={image}
                saveToLocalStorage={() => this.props.saveToLocalStorage(el)}
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
export const ProductListFlux = connect(stateToProps)(ProductList);
