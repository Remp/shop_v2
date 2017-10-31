import React, { Component } from 'react';
import $ from 'jquery';
import './styles/navigation.css';
import './styles/navigation_product.css';
import FontAwesome from 'react-fontawesome';
import { categories } from './categories.js';

// import hp_logo from './images/logo-hp.png';
// import apple_logo from './images/logo-apple.png';
// import asus_logo from './images/logo-asus.jpg';
// import acer_logo from './images/logo-acer.jpg';
// import lenovo_logo from './images/logo-lenovo.jpg';
// import samsung_logo from './images/logo-samsung.jpg';
// import meizu_logo from './images/logo-meizu.jpg';
// import xiaomi_logo from './images/logo-xiaomi.jpg';
// import huawei_logo from './images/logo-huawei.gif';
// import beats_logo from './images/logo-beats.svg';


// управляющий объект категорий
// const categories = {
//     laptop: {
//         brand: [
//             {name: 'hp', img: hp_logo},
//             {name: 'apple', img: apple_logo},
//             {name: 'asus', img: asus_logo},
//             {name: 'acer', img: acer_logo},
//             {name: 'lenovo', img: lenovo_logo}
//         ],
//         diagonal: ['9 - 12.5', '13', '14', '15 - 15.6', '16 - 17'],
//         cpu: ['intel', 'AMD', 'intel core i3', 'intel core i5', 'intel core i7'],
//         gpu: ['nVidia GeForce', 'AMD Radeon'],
//         os: ['windows', 'linux', 'without os'],
//         case: ['metal', 'plastic', 'combined'],
//         ram: ['2gb - 8gb', '9gb - 16gb', '32gb+']
//     },
//     smartphone: {
//         brand: [
//             {name: 'samsung', img: samsung_logo},
//             {name: 'apple', img: apple_logo},
//             {name: 'meizu', img: meizu_logo},
//             {name: 'lenovo', img: lenovo_logo},
//             {name: 'Xiaomi', img: xiaomi_logo}
//         ],
//         diagonal: ['4.1 - 4.5', '4.6 - 5', '5.1 - 5.5', '5.6 - 6', '6+'],
//         'battery capacity': ['lt 2999mAh', '3000 - 3999mAh', '4000+ mAh'],
//         ram: ['lt 2gb', '2gb', '3gb', '4gb', '6gb'],
//         'main camera': ['lt 12mpx', '13mpx+'],
//         'frontal camera': ['lt 5mpx', '5mpx+'],
//     },
//     headphones: {
//         brand: [
//             {name: 'meizu', img: meizu_logo},
//             {name: 'xiaomi', img: xiaomi_logo},
//             {name: 'huawei', img: huawei_logo},
//             {name: 'beats', img: beats_logo}
//         ],
//         'Wearing Type': ['in-ear', 'in-ear with ear hook', 'ear hook', 'neckband', 'headband'],
//         connectivity: ['wireless'],
//         'connecting interface': ['3.5mm', '2.5mm', 'micro usb', 'tf card'],
//         application: ['DJ', 'sport', 'running', 'gaming']
//     }
// }
function _getCategoriesCopy(){
    let list = {};
    for (let cat in categories){
        let icat = categories[cat];
        let elem = {};
        for (let clasf in icat){
            elem[clasf] = icat[clasf].slice();
        }
    }
}

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
        })();
        this.state = {
            check_list: check_list,
            current: "laptop"
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
        let check_list = ([this.state.check_list].slice())[0];
        check_list[parent][category][name] = !check_list[parent][category][name];
        this.setState({check_list: check_list});
    }
    category_click_handler(e){
        // из-за неопределенного количества элементов внутри li, пришлось делать такую реализацию
        $('.categories-bar > ul > li').removeClass('checked');
        let elem = $(e.target);
        if (elem.not('li').length)
            elem = elem.parent('li');
        elem.toggleClass('checked');

        $('.brand').add('.filter-bar > ul > li').css({transition: '0s'});
        this.setState({current: e.target.dataset.category});  
        $('.brand').add('.filter-bar > ul > li').css({transition: ''});        
    }
    // передается в CategoriesBtnSet
    btnReset_handler_click(e){
        const check_list = this.state.check_list;
        for (let clasf in check_list[this.state.current]){
            const elem = check_list[this.state.current][clasf];
            for (let name in elem)
                elem[name] = false;
        }
        this.setState({check_list: check_list});
    }
    render(){
        return(
            <div ref={(el) => this.panel = el} className="products-panel">
                <div className="categories-bar">
                    <h2>Categories</h2>
                    <ul>
                        <li className='checked' onClick={(e) => this.category_click_handler(e)} data-category='laptop'>
                            <FontAwesome name='laptop' />Laptops
                        </li>
                        <li onClick={(e) => this.category_click_handler(e)} data-category='smartphone'>
                            Smartphones
                        </li>
                        <li onClick={(e) => this.category_click_handler(e)} data-category='headphones'>
                            Headphones
                        </li>
                    </ul>
                    <CategoriesBtnSet btnReset_click_handler={(e) => this.btnReset_handler_click(e)} />
                </div>
                <CategoryContent check_list={this.state.check_list} onCheck_handler={(p, c, n) => this.onCheck_handler(p, c, n)} current={this.state.current} />
            </div>
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
            return <Brand isChecked={this.props.check_list[parent]['brand'][name]} onChecking={(p, c, n) => this.props.onCheck_handler(p, c, n)} parent={parent} category='brand' name={name} img={el.img} />
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
                    <FilterItem isChecked={this.props.check_list[parent][n][name]} onChecking={(p, c, n) => this.props.onCheck_handler(p, c, n)} parent={this.props.current} category={n} name={el} />
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
data-category - используется в качестве указания для фильтрации, совместно с классом checked
 */