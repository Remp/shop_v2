import React, {Component} from 'react';
import ProductPageComponent from '../components/ProductPage';
import images from '../images';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ProductPage extends Component{
    static contextTypes = {
        router: PropTypes.func.isRequired
    }
    componentDidMount(){
        this.props.onMount();
    }
    componentWillMount(){
        const products = this.props.products;
        const match = this.context.router.route.match.params.name;
        this.currentProd = (() => {
            for (let i = 0; i < products.length; i++){
                const name = `${products[i].brand} ${products[i].model.replace(' ', '_')}`.replace(' ', '_');
                if (name === match)
                    return products[i];
            }
        })();
    }
    deifyProduct(){
        const products = this.props.products;
        const match = this.context.router.route.match.params.name;
        this.currentProd = (() => {
            for (let i = 0; i < products.length; i++){
                const name = `${products[i].brand} ${products[i].model.replace(' ', '_')}`.replace(' ', '_');
                if (name === match)
                    return products[i];
            }
        })();
    }
    // Определяем содержимое вкладки description
    deifyDescription(){
        const name = `${this.currentProd.brand} ${this.currentProd.model}`;
        const description = this.currentProd.description;
        const parameters = (() => {
            const params = this.currentProd.parameters;
            const toRet = [];
            for (let c in params)
                toRet.push(
                    <li>{c}: {params[c]}</li>
                )
            return toRet;
        })();
        return (
            <div>
                <h2>{name}</h2>
                <p>{description}</p>
                <ul>{parameters}</ul>
            </div>
        )
    }
    // Определяем содержимое вкладки comments
    deifyComments(){
        return [];
    }
    close_handler(){
        this.context.router.history.push('/products');
    }
    render(){
        const path = `${this.currentProd.brand} ${this.currentProd.model}`;
        return (   
            <ProductPageComponent 
                description={this.deifyDescription()} 
                comments={this.deifyComments()}
                images={images[path]}
                close_handler={() => this.close_handler()}
            />
        )
    }
}

function stateToProps(state){
    const parsed = state.toJS();
    return {
        products: parsed.products
    }
}
export default connect(stateToProps)(ProductPage);