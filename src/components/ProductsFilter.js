import React, { Component } from 'react';
import '../styles/ProductsFilter.css';
import CategoryName from '../containers/CategoryName';
import CategoriesBtnSet from '../components/CategoriesBtnSet';
import CategoryContent from '../containers/CategoryContent';

class FilterPanel extends Component{
    render(){
        const { check_list, current } = this.props;        
        const handler = (cat) => this.props.category_click_handler(cat);
        return(
            <div 
                className="products-panel"
            >
                <div className="categories-bar">
                    <h2>Categories</h2>
                    <ul>
                        <CategoryName 
                            check_handler={handler} 
                            check_list={check_list} name='Laptops' faclass='fa fa-laptop' 
                            category='laptops'
                        />
                        <CategoryName 
                            check_handler={handler} 
                            check_list={check_list} name='Smartphones' faclass='fa fa-mobile' 
                            category='smartphones'
                        />
                        <CategoryName 
                            check_handler={handler} 
                            check_list={check_list} name='Headphones' faclass='fa fa-headphones' 
                            category='headphones'
                        />
                    </ul>
                    <CategoriesBtnSet 
                        btnReset_click_handler={() => this.props.btnReset_click_handler()}
                        findHandler={() => this.props.find_handler()} 
                    />
                </div>
                <CategoryContent 
                    check_list={check_list} 
                    onCheck_handler={(p, c, n) => this.props.onCheck_handler(p, c, n)} 
                    current={current} 
                />
            </div>
        )
    }
}
export default FilterPanel;