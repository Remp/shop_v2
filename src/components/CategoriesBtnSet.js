import React, { Component } from 'react';
import '../styles/CategoriesBtnSet.css';

class CategoriesBtnSet extends Component{
    render(){
        return (
            <div className="categories-btns-panel">
                <div className='categories-panel-btn'>Find</div>
                <div className="categories-panel-btn">Except</div>
                <div onClick={() => this.props.btnReset_click_handler()} className='categories-panel-btn'>
                    Reset
                </div>
            </div>
        )
    }
}
export default CategoriesBtnSet;