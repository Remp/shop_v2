import React, { Component } from 'react';
import { categories } from '../categories.js';
import CategoryContentComponent from '../components/CategoryContent';
import Brand from './Brand';
import FilterBar from '../components/FilterBar';
import FilterItem from './FilterItem';

class CategoryContent extends Component{
    render(){
        const current = categories[this.props.match.params.category];
        // создаем логотипы из объекта categories      
        const brands = current['brand'].map((el) => {
            const parent = this.props.current;
            const name = el.name;            
            return (
                <Brand 
                    isChecked={this.props.check_list[parent].data['brand'][name]} 
                    onChecking={(p, c, n) => this.props.onCheck_handler(p, c, n)} 
                    parent={parent} 
                    category='brand' 
                    name={name} 
                    img={el.img} 
                />
            )
        });
        
        // создаем FilterBar'ы основываясь на объекте categories
        const filter_bars = [];
        let counter = 0;
        for (let n in current)
        {
            if (n === 'brand')
                continue;
            const elems  = current[n].map((el) => {
                const parent = this.props.current;
                const name = el;
                return (
                    <FilterItem 
                        isChecked={this.props.check_list[parent].data[n][name]} 
                        onChecking={(p, c, n) => this.props.onCheck_handler(p, c, n)} 
                        parent={parent} category={n} name={el} 
                    />
                )
            });
            filter_bars[counter++] = <FilterBar name={n} items={elems} />
        }
        //

        return (
            <CategoryContentComponent 
                brands={brands}
                filter_bars={filter_bars}
            />
        )
    }
}
export default CategoryContent;