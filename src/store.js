import reducer from './reducer';
import io from 'socket.io-client';
import {createStore, applyMiddleware} from 'redux';
import Constants from './Constants';

function middleware({getState, dispatch}){
    return next => action => {
        if (action.type == Constants.RODUCTS_REQUEST)
            socket.emit('request_products', action.data)
    }
}
const socket = new io('http://localhost:7777');

socket.on('products', state => {
    store.dispatch({
        type: Constants.PRODUCTS_GET_ACCESS,
        state: state
    })
})
export const store = createStore(reducer, applyMiddleware(middleware));