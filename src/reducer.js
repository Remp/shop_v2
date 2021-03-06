import Constants from './Constants';
import {Map, List, fromJS} from 'immutable';

const def = fromJS({
    user: '',
    isUserLoading: false,
    isProductsLoading: false,
    products: [{
        id: 1,
        brand: 'hp',
        model: 'probook 4540s',
        price: '200$',
        parameters: {
            gpu: 'nVidia',
            cpu: 'intel core i7',
            diagonal: '15.5'
        },
        description: `Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque 
            laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae 
            vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro 
            quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non 
            numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad 
            minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
            commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil 
            molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla`
    }, 
    {
        id: 2,
        brand: 'asus',
        model: 'zenbook',
        price: '1500$',
        parameters: {
            gpu: 'nVidia',
            cpu: 'intel core i7',
            diagonal: '15.5'
        },
        description: `Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque 
            laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae 
            vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro 
            quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non 
            numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad 
            minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
            commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil 
            molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla`
    }]
})
export default (state = def, action) => {
    switch(action.type){
        case Constants.PRODUCTS_GET_ACCESS: 
            return state.update('products', action.products);
        case Constants.FAILED_DB_CONNECTION:
            return state.update('err', action.err);
        case Constants.PRODUCTS_LOADING: 
            return state.update('isProductsLoading', l => !l);
        case Constants.SIGN_IN_LOADING:
            return state.update('isUserLoading', l => !l)
        case Constants.SIGN_IN_ACCESS:
            return state.update('user', action.user)    
        case Constants.SIGN_IN_FAIL:
            return state.update('err', action.err);
        default: 
            return state;          
    }
}