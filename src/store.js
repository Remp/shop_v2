import reducer from './reducer';
import io from 'socket.io-client';
import {createStore, applyMiddleware} from 'redux';
import Constants from './Constants';

function middleware({getState, dispatch}){
    return next => action => {
        if (action.type == Constants.RODUCTS_REQUEST)
            socket.emit('request_products', action.request)
    }
}
const socket = new io('http://localhost/7777');

socket.on('products', state => {
    store.dispatch({
        type: Constants.PRODUCTS_GET_ACCESS,
        products: state.data
    })
})
export const store = createStore(reducer, applyMiddleware(middleware));