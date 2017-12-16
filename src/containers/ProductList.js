import React, {Component} from 'react';
import ProductListComponent from '../components/ProductList';
import Product from './Product';

class ProductList extends Component{
    render(){
        const prod = <Product 
            name='hp probook 25dlk fhdsk fha sihf aiuwd hyaiuw ldhawhd awuhdaiulwdhaw' 
            description='ddfsfks;djkfklsdfj' 
            price='2000$'
        />
        return (
            <ProductListComponent 
                products={prod}                 
            />     
        )
    }
}
export default ProductList;