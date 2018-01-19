import reducer from './reducer';
import io from 'socket.io-client';
import {createStore, applyMiddleware} from 'redux';
import Constants from './Constants';
import {fromJS} from 'immutable';

function middleware({getState, dispatch}){
    return next => action => {
        if (action.type == Constants.RODUCTS_REQUEST)
            socket.emit('products_request', action.data)
    }
}
const socket = new io('http://localhost:7777');

socket.on('get_products', state => {
    store.dispatch({
        type: Constants.PRODUCTS_GET_ACCESS,
        state: state
    });
    store.dispatch({
        type: Constants.LOADING,
    });
});
socket.on('db_connection_failed', () => {
    store.dispatch({
        type: Constants.FAILED_DB_CONNECTION,
        state: fromJS({
            error: 'Failed to connect to database',
            products: []
        })      
    });
    store.dispatch({
        type: Constants.LOADING,
    });
})
export const store = createStore(reducer, applyMiddleware(middleware));