import ProductsRequest from '../interaction/ProductsRequest';
import Dispatcher from '../Dispatcher';
import Constants from '../Constants';


export default {
    getProducts(check_list){
        ProductsRequest.getProducts(check_list)
        .then(products => {
            Dispatcher.dispatch({
                type: Constants.PRODUCTS_GET_ACCESS,
                products: products
            })
        })
    }
}