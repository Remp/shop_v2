import {store} from './store';
import Constants from './Constants';

export default {
    requestProducts(check_list){
        console.log(check_list);
        const table = (() => {
            for (let c in check_list)
                if (check_list[c].isChecked)
                    return c;
        })();
        console.log(table);

        // распарсить check_list в sql запрос
        let cols = [];
        let where = [];
        for (let c in check_list[table].data){
            const obj = check_list[table].data[c];
            cols.push(c);
            for (let i in obj){
                if (obj[i]){
                        where.push(`${c} ${parse(i)}`)
                }
            }
        }
        const request = `select ${cols.join(", ")} from ${table} ${where.length ? `where ${where.join('and ')}`: ''}`;
        console.log(request);
        //

        store.dispatch({
            type: Constants.RODUCTS_REQUEST,
            request: request
        })
    }
}
//парсит значения типа '12 - 13' в 'between 12 and 13', 'lt 13' в '< 13', 'gt 13' в '> 13'
function parse(str){
    if (str.split(' ').length == 1){
        if (str.match(/\d+[\.]?[\d+]?/))
            return `= ${str} `
        return `like '%${str}%' `;
    }
    if (str.match(/lt/))
        return `< ${str.match(/\d+/)}`
    if (str.match(/gt/))
        return `> ${str.match(/\d+/)}`   
    if (str.split(' ').length > 1)
        return `like '%${str}%' `;
    const vals = str.match(/\d+[\.]?[\d+]?/gi);
    return `between ${vals[0]} and ${vals[1]} `;
}