import Constants from './Constants';

const def = {
    brand: 'hp',
    model: 'probook 4540s',
    price: '200$',
    parameters: {
        gpu: 'nVidia',
        cpu: 'intel core i7',
        diagonal: '15.5'
    }
}
export default (state = def, action) => {
    switch(action.type){
        case Constants.PRODUCTS_GET_ACCESS: 
            return action.products
        default: {
            return []
        }
            
    }
}