import React, {Component} from 'react';
import ProductListComponent from '../components/ProductList';
import Product from './Product';
import ProductsStore from '../store/ProductsStore';

class ProductList extends Component{
    constructor(){
        super();
        this.state = {
            products: ProductsStore.getCurrentProducts()
        }
    }
    onChange = (() => {
        this.setState({
            products: ProductsStore.getCurrentProducts()
        })
    }).bind(this);

    componentDidMount(){
        ProductsStore.addChangeListener(this.onChange)
    }
    componentWillUnmount(){
        ProductsStore.removeChangeListener(this.onChange)
    }
    render(){
        //парсим
        const prod = this.state.products.map(el => {
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
export default ProductList;