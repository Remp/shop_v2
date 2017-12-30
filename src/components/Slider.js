import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.css';
import '../styles/Slider.css';

class Slider extends Component{
    constructor(){
        super();
        this.state = {
            current: 0
        }
    }
    next(){
        let current = this.state.current;
        current = ++current % this.props.images.length;
        this.setState({
            current: current
        })
    }
    prev(){
        let current = this.state.current;
        current = current === 0 ? this.props.images.length - 1 : --current % this.props.images.length
        this.setState({
            current: current
        })
    }
    render(){
        const currentImage = `url(${this.props.images[this.state.current]})`;
        const style = {
            backgroundImage: currentImage
        }
        return (
            <div  className="slider" style={style}>
                <div onClick={() => this.prev()}>
                    <i className="fa fa-chevron-left"></i>
                </div>
                <div onClick={() => this.next()}>
                    <i className="fa fa-chevron-right"></i>
                </div>
            </div>
        )
    }
}
export default Slider;