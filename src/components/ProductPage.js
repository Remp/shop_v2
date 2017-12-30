import React, {Component} from 'react';
import Slider from './Slider';
import ProductDescription from './ProductDescription';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/ProductPage.css';

class ProductPage extends Component{
    render(){
        return (
            <div className="product-page">
                <div className="close">
                    <div className="close-btn" onClick={() => this.props.close_handler()}>
                        <i className="fa fa-times"></i>
                    </div>
                </div>
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