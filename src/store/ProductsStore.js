import {EventEmitter} from 'events';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

const CHANGE_EVENT = 'change'

let _products = [];

const ProductsStore = Object.assign({}, EventEmitter.prototype, {

    getCurrentProducts(){
        return _products;
    },
    emitChange(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback)
    }
});
Dispatcher.register(action => {
    switch(action.type){
        case Constants.PRODUCTS_GET_ACCESS: 
            _products = action.products ? action.products : [];
            ProductsStore.emitChange();
    }
});
export default ProductsStore;