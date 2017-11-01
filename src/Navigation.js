import React, { Component } from 'react';
import $ from 'jquery';
import './styles/navigation.css';
import './styles/navigation_product.css';
import { categories } from './categories.js';
import 'font-awesome/css/font-awesome.min.css';


class Navigation extends Component{

    products_click_handler(e){
        $(this.products_panel).slideToggle(0);
        $(e.target).toggleClass('checked');
    }
    render(){
        return (
            <div className='navigation'>
                <div className="navbar">
                    <div className="nav-logo"><a href="#">The beast market</a></div>
                    <div className="nav-menu">
                        <ul>
                            <li onClick={(e) => this.products_click_handler(e)}>Products</li>
                        </ul>
                    </div>
                    <div className="nav-login">
                        <div className="nav-login-avatar"></div>
                        <div className="nav-login-user">Log in</div>
                    </div>
                </div>
                <div style={{display: 'none'}} ref={(el) => this.products_panel = el} className='products-panel-external'>
                    <ProductsPanel />                      
                </div>
            </div>
        )
    }
}
// используется в Navigation
class ProductsPanel extends Component{
    constructor(){
        super();
        //карта отмеченных фильтров
        const check_list = (() => {
            let list = {};
            for (let cat in categories){
                const elem = categories[cat];
                let cont = {data: {}, isChecked: false}
                for (let icat in elem){
                    const ielem = elem[icat];
                    let icont = {};
                    for (let itm = 0; itm < ielem.length; itm++){
                        icont[icat === 'brand' ? ielem[itm].name : ielem[itm]] = false;
                    }
                    cont.data[icat] = icont;
                }
                list[cat] = cont;
            }         
            return list;
        })();
        // значение по умолчанию
        for (let cat in check_list){
            check_list[cat].isChecked = true;
            break;
        }
        this.state = {
            check_list: check_list,
        } 
    }
    _reset_check_list(){
        let list = {};
        for (let cat in categories){
            const elem = categories[cat];
            let cont = {}
            for (let icat in elem){
                const ielem = elem[icat];
                let icont = {};
                for (let itm = 0; itm < ielem.length; itm++){
                    icont[icat === 'brand' ? ielem[itm].name : ielem[itm]] = false;
                }
                cont[icat] = icont;
            }
            list[cat] = cont;
        }         
        return list;
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
    btnReset_handler_click(e){
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
        const handler = (cat) => this.category_click_handler(cat);
        const current = (() => {
            for (let c in this.state.check_list)
                if (this.state.check_list[c].isChecked)
                    return c;
        })();
        return(
            <div ref={(el) => this.panel = el} className="products-panel">
                <div className="categories-bar">
                    <h2>Categories</h2>
                    <ul>
                        <CategoryName check_handler={handler} 
                                    check_list={this.state.check_list} name='Laptops' faclass='fa fa-laptop' 
                                    category='laptop'/>
                        <CategoryName check_handler={handler} 
                                    check_list={this.state.check_list} name='Smartphones' faclass='fa fa-mobile' 
                                    category='smartphone'/>
                        <CategoryName check_handler={handler} 
                                    check_list={this.state.check_list} name='Headphones' faclass='fa fa-headphones' 
                                    category='headphones'/>
                    </ul>
                    <CategoriesBtnSet btnReset_click_handler={(e) => this.btnReset_handler_click(e)} />
                </div>
                <CategoryContent check_list={this.state.check_list} onCheck_handler={(p, c, n) => this.onCheck_handler(p, c, n)} current={current} />
            </div>
        )
    }
}
class CategoryName extends Component{
    onClick_handler(){
        this.props.check_handler(this.props.category);
    }
    render(){
        const isChecked = this.props.check_list[this.props.category].isChecked;
        return (
            <li data-category={this.props.category} className={isChecked ? 'checked' : ''} onClick={() => this.onClick_handler()}>
                <i className={this.props.faclass} />{this.props.name}
            </li>
        )
    }
}
// используется в ProductsPanel (правая панель)
class CategoryContent extends Component{
    render(){
        const current = categories[this.props.current];
        // создаем логотипы из объекта categories      
        const brands = current['brand'].map((el) => {
            const parent = this.props.current;
            const name = el.name;            
            return <Brand isChecked={this.props.check_list[parent].data['brand'][name]} onChecking={(p, c, n) => this.props.onCheck_handler(p, c, n)} parent={parent} category='brand' name={name} img={el.img} />
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
                    <FilterItem isChecked={this.props.check_list[parent].data[n][name]} onChecking={(p, c, n) => this.props.onCheck_handler(p, c, n)} parent={this.props.current} category={n} name={el} />
                )
            });
            filter_bars[counter++] = <FilterBar name={n} items={elems} />
        }
        //

        return (
            <div className="categories-content">
                <div className="brands">
                    {brands}                                     
                </div>
                <div className="filter">
                    {filter_bars}
                </div>
                
            </div>
        )
    }
}
// используется в CategoryContent
class Brand extends Component{
    onClick_handler(e){
        const name = this.props.name;
        const category = this.props.category;
        const parent = this.props.parent;
        this.props.onChecking(parent, category, name);
    }
    render(){
        return (
            <div ref={(el) => this.elem = el} onClick={(e) => this.onClick_handler(e)} className={this.props.isChecked ? 'brand checked' : 'brand'} data-category={this.props.name}>
                <img src={this.props.img} alt={this.props.name}/>
            </div>
        )
    }
}
// используется в CategoryContent
class FilterBar extends Component{
    render(){
        return (
            <div className="filter-bar">
                <h3>{this.props.name}</h3>
                <ul>
                    {this.props.items}
                </ul>
            </div>
        )
    }
}
// используется в CategoryContent --> FilterBar
class FilterItem extends Component{
    onClick_handler(e){
        const name = this.props.name;
        const category = this.props.category;
        const parent = this.props.parent;
        this.props.onChecking(parent, category, name);
    }
    render(){
        return (
            <li className={this.props.isChecked ? 'checked' : ''} data-category={this.props.name} ref={(el) => this.elem = el} onClick={(e) => this.onClick_handler(e)}>
                {this.props.name}
            </li>
        )
    }
}
// используется в Navigation (представляем собой бар с кнопками Find и Reset)
class CategoriesBtnSet extends Component{
    render(){
        return (
            <div className="categories-btns-panel">
                <div className='categories-panel-btn'>Find</div>
                <div className="categories-panel-btn">Except</div>
                <div onClick={(e) => this.props.btnReset_click_handler(e)} className='categories-panel-btn'>
                    Reset
                </div>
            </div>
        )
    }
}

export default Navigation;

/*
data-category - используется в качестве указания для фильтрации
 */