import React, {Component} from 'react';
import '../styles/ProductDescription.css';
import $ from 'jquery';

class ProductDescription extends Component{
    toggle(name, e){
        // стиль названий вкладок меняем
        $(this.upper).children().removeClass('checked');
        $(e.target).addClass('checked');

        const $taps = $(this.content).children();
        $taps.css({display: 'none'});
        $taps.toArray().forEach(el => {
            if (el.dataset.toggle === name)
                el.style.display = 'block'
        });
    }
    render(){
        return (
            <div className="product-description">
                <div ref={el => this.upper = el} className="upper">
                    <div 
                        className='desc-item checked'
                        onClick={(e) => this.toggle('description', e)}
                    >
                        Desription
                    </div>
                    <div 
                        className='desc-item'
                        onClick={(e) => this.toggle('comments', e)}
                    >
                        Comments
                    </div>
                </div>
                <div ref={el => this.content = el} className="content">
                    <div data-toggle="description">
                        {this.props.description}
                    </div>
                    <div data-toggle="comments">
                        {this.props.comments}
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductDescription;