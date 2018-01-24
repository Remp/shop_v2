import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.css';
import '../styles/Slider.css';
import $ from 'jquery';

class Slider extends Component{
    constructor(){
        super();
        this.current = 0;
        this._resizeSlider = this._resizeSlider.bind(this);
    }
    componentDidMount(){
        this._resizeSlider();
        window.addEventListener('resize', this._resizeSlider);
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this._resizeSlider);
    }
    _resizeSlider(){
        this.$controllers.css({
            width: this.$slider.width() + 'px',
            height: this.$slider.height() + 'px'
        })
    }
    next(){
        this.current = this.current === this.props.images.length - 1 ? 0 : ++this.current;
        this.$scroller.css({
            transform: `translateX(${-this.current * this.$scroller.width()}px)`
        })
    }
    prev(){
        this.current = this.current === 0 ? this.props.images.length - 1 : --this.current;
        this.$scroller.css({
            transform: `translateX(${-this.current * this.$scroller.width()}px)`
        })
    }
    onmouseenter_handler(){
        this.$controllers.fadeIn(10);
    }
    onmouseleave_handler(){
        this.$controllers.fadeOut(10);
    }
    render(){
        return (
            <div 
                onMouseEnter={() => this.onmouseenter_handler()} 
                onMouseLeave={() => this.onmouseleave_handler()} 
                ref={el => this.$slider = $(el)} 
                className="slider"
            >
                <div style={{display: 'none'}} ref={el => this.$controllers = $(el)} class="controllers">
                    <button onClick={() => this.prev()} className='controller'>
                        <i className='fa fa-chevron-left'></i>
                    </button>
                    <button onClick={() => this.next()} className='controller'>
                        <i className='fa fa-chevron-right'></i>
                    </button>
                </div>
                <ul ref={el => this.$scroller = $(el)} className="scroller">
                    {
                        this.props.images.map(img => {
                            return (
                                <li onClick={() => this.onClick_handler()}  className="item-scroll">
                                    <img src={img} alt=""/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
           
        )
    }
}
export default Slider;