import React, {Component} from 'react';
import Slider from './Slider.js';
import ProductDescription from './ProductDescription.1.js';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/ProductPage.css';
import $ from 'jquery';

class ProductPage extends Component{
    render(){
        return (
            <div ref={el => this.$page = $(el)} className="product-page">
                <div className="product-content">
                    <Slider images={this.props.images} />
                    <ProductDescription 
                        description={this.props.description} 
                        comments={this.props.comments}
                    />
                </div>

            </div>
        )
    }
}
export default ProductPage;