import React, { Component } from 'react';
import ProductsPanelComponent from '../components/ProductsPanel';
import { categories, check_list } from '../categories.js';

class ProductsPanel extends Component{
    constructor(){
        super();
        this.state = {
            check_list: check_list,
        } 
    }
    // передается в CategoryContent --> Brand и FilterItem, вызывается при отметке (при отметке фильтра меняем карту фильтров)
    onCheck_handler(parent, category, name){
        let check_list = Object.assign({}, this.state.check_list);
        check_list[parent].data[category][name] = !check_list[parent].data[category][name];
        this.setState({check_list: check_list});
    }
    // передается в CategoryName
    category_click_handler(cat){
        const check_list = Object.assign({}, this.state.check_list);
        for (let c in check_list){
            if (check_list[c].data)
                check_list[c].isChecked = false;            
        }
        check_list[cat].isChecked = true;   
        this.setState({check_list: check_list})     
    }
    // передается в CategoriesBtnSet
    btnReset_handler_click(){
        const check_list = Object.assign({}, this.state.check_list);
        for (let categs in check_list){
            if (check_list[categs].isChecked){
                const clasf = check_list[categs].data;
                for (let cat in clasf){
                    const elem = clasf[cat];
                    for (let name in elem)
                        elem[name] = false;
                }
                break;
            } 
        }
        this.setState({check_list: check_list});
    }
    render(){
        const current = (() => {
            for (let c in this.state.check_list)
                if (this.state.check_list[c].isChecked)
                    return c;
        })();
        return(
            <ProductsPanelComponent 
                check_list={this.state.check_list}
                category_click_handler={(cat) => this.category_click_handler(cat)}
                btnReset_click_handler={() => this.btnReset_handler_click()}
                onCheck_handler={(p, c, n) => this.onCheck_handler(p, c, n)}
                current={current}
            />
        )
    }
}
export default ProductsPanel;