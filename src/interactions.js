import {store} from './store';
import Constants from './Constants';

export default {
    requestProducts(check_list){
        console.log(check_list);

        store.dispatch({
            type: Constants.LOADING,
        })
        store.dispatch({
            type: Constants.RODUCTS_REQUEST,
            data: parseMongo(check_list)
        })
    }
}
//парсит значения типа '12 - 13' в 'between 12 and 13', 'lt 13' в '< 13', 'gt 13' в '> 13'
function parse(str){
    if (str.split(' ').length == 1){
        if (str.match(/\d+[\.]?[\d+]?/))
            return str
        return {$regex: str};
    }
    if (str.match(/lt/))
        return {$lt: `${str.match(/\d+/)}`}
    if (str.match(/gt/))
        return {$gt: `${str.match(/\d+/)}`}   
    const vals = str.match(/\d+[\.]?[\d+]?/gi);
    if (!vals)
        return {$regex: str};
    return {
        $gt: vals[0],
        $lt: vals[1]
    }
}
function parseMongo(check_list){
    let collection = '';
    const filter = {};
    for (let i in check_list)
        if (check_list[i].isChecked){
            collection = i;
            for (let j in check_list[i].data){
                const obj = check_list[i].data[j];
                for (let l in obj)
                    if (obj[l])
                        filter[j] = parse(l)
            }
            break;
        }
    return {
        collection: collection,
        filter: filter
    }
}