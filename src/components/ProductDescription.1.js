import React, {Component} from 'react';
import '../styles/ProductDescription.1.css';
import {Tabs, Tab} from 'material-ui/Tabs';

class ProductDescription extends Component{
    render(){
        return (
            <Tabs className='product-description'>
                <Tab className='content' label='Description'>
                    <div  className='tab-content'>
                        {this.props.description}
                    </div>
                </Tab>
                <Tab className='content' label='Comments'>
                    <div className='tab-content'>
                        {this.props.comments}
                    </div>
                </Tab>
            </Tabs>
        )
    }
}
export default ProductDescription;