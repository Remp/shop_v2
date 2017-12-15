import React, {Component} from 'react';
import ProductListComponent from '../components/ProductList';
import Product from './Product';

class ProductList extends Component{
    render(){
        const prod = <Product name='hp probook 25' description='ddfsfks;djkfklsdfj' />
        return (
            <ProductListComponent 
                products={prod} 
                
            />     
        )
    }
}
export default ProductList;