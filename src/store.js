import reducer from './reducer';
import io from 'socket.io-client';
import {createStore, applyMiddleware} from 'redux';
import Constants from './Constants';
import {fromJS} from 'immutable';

//здесь запросы на сервер диспатчим
function middleware({getState, dispatch}){
    return next => action => {
        switch(action.type){
            case Constants.PRODUCTS_GET_ACCESS:
                socket.emit('products_request', action.data)
                break;
            case Constants.SIGN_IN:
                socket.emit('sign_in', {
                    login: action.login,
                    password: action.password
                })
                break;
            case Constants.SIGN_UP:
                socket.emit('sign_up', {
                    login: action.data.login,
                    password: action.data.password,
                    name: action.data.name
                })   
                break;        
        }           
    }
}
const socket = new io('http://localhost:7777');

socket.on('get_products', data => {
    store.dispatch({
        type: Constants.PRODUCTS_GET_ACCESS,
        products: data.products
    });
    store.dispatch({
        type: Constants.PRODUCTS_LOADING,
    });
});
socket.on('db_connection_failed', (err) => {
    store.dispatch({
        type: Constants.FAILED_DB_CONNECTION,
        err: err     
    });
    store.dispatch({
        type: Constants.PRODUCTS_LOADING,
    });
});
socket.on('sign_in_access', user => {
    store.dispatch({
        type: Constants.SIGN_IN_LOADING
    })
    store.dispatch({
        type: Constants.SIGN_IN_ACCESS,
        user: user
    })
})
socket.on('sign_in_fail', err => {
    store.dispatch({
        type: Constants.SIGN_IN_LOADING
    })
    store.dispatch({
        type: Constants.SIGN_IN_FAIL,
        err: err
    })
})
export const store = createStore(reducer, applyMiddleware(middleware));