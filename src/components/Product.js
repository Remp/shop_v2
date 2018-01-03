import React, {Component} from 'react';
import '../styles/Product.css';
import $ from 'jquery';

class ProductCard extends Component{
    componentDidMount(){

        const $product = $(this.product);
        this.$content = $(this.content);
        const $title = $(this.title);
        const $price = $(this.price);

        const prH = $product.height();
        const cntH = this.$content.height();
        const tH = $title.height();
        const priceH = $price.height();

        this.basicMargin = prH - tH - priceH;
        this.mouseOverMargin = prH - cntH - priceH;

        this.$content.css({
            marginTop: this.basicMargin + 'px'
        });

    }
    onMouseEnter_handler(){
        this.$content.animate({
            marginTop: this.mouseOverMargin + 'px'
        }, {
            queue: false
        });      
    }
    onMouseLeave_handler(){
        this.$content.animate({
            marginTop: this.basicMargin + 'px'
        }, {
            queue: false
        }); 
    }
    render(){
        const image = `url(${this.props.image})`;
        return (
            <div ref={(el) => this.product = el} 
                style={{backgroundImage: image}} 
                className="product"
                onMouseEnter={() => this.onMouseEnter_handler()}
                onMouseLeave={() => this.onMouseLeave_handler()}
                onClick={() => this.props.onClick()}
            >
                <div ref={el => this.price = el} className="product-price">{this.props.price}</div>
                <div ref={(el) => this.content = el} className="product-content">
                    <div ref={el => this.title = el} className="product-title">{this.props.name}</div>
                    <div className="product-description">{this.props.description}</div>
                </div>
            </div>
        )
    }
}
export default ProductCard;