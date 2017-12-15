import hp_logo from './images/logo-hp.png';
import apple_logo from './images/logo-apple.png';
import asus_logo from './images/logo-asus.jpg';
import acer_logo from './images/logo-acer.jpg';
import lenovo_logo from './images/logo-lenovo.jpg';
import samsung_logo from './images/logo-samsung.jpg';
import meizu_logo from './images/logo-meizu.jpg';
import xiaomi_logo from './images/logo-xiaomi.jpg';
import huawei_logo from './images/logo-huawei.gif';
import beats_logo from './images/logo-beats.svg';

export const categories = {
    laptop: {
        brand: [
            {name: 'hp', img: hp_logo},
            {name: 'apple', img: apple_logo},
            {name: 'asus', img: asus_logo},
            {name: 'acer', img: acer_logo},
            {name: 'lenovo', img: lenovo_logo}
        ],
        diagonal: ['9 - 12.5', '13', '14', '15 - 15.6', '16 - 17'],
        cpu: ['intel', 'AMD', 'intel core i3', 'intel core i5', 'intel core i7'],
        gpu: ['nVidia GeForce', 'AMD Radeon'],
        os: ['windows', 'linux', 'without os'],
        case: ['metal', 'plastic', 'combined'],
        ram: ['2gb - 8gb', '9gb - 16gb', '32gb+']
    },
    smartphone: {
        brand: [
            {name: 'samsung', img: samsung_logo},
            {name: 'apple', img: apple_logo},
            {name: 'meizu', img: meizu_logo},
            {name: 'lenovo', img: lenovo_logo},
            {name: 'Xiaomi', img: xiaomi_logo}
        ],
        diagonal: ['4.1 - 4.5', '4.6 - 5', '5.1 - 5.5', '5.6 - 6', '6+'],
        'battery capacity': ['lt 2999mAh', '3000 - 3999mAh', '4000+ mAh'],
        ram: ['lt 2gb', '2gb', '3gb', '4gb', '6gb'],
        'main camera': ['lt 12mpx', '13mpx+'],
        'frontal camera': ['lt 5mpx', '5mpx+'],
    },
    headphones: {
        brand: [
            {name: 'meizu', img: meizu_logo},
            {name: 'xiaomi', img: xiaomi_logo},
            {name: 'huawei', img: huawei_logo},
            {name: 'beats', img: beats_logo}
        ],
        'Wearing Type': ['in-ear', 'in-ear with ear hook', 'ear hook', 'neckband', 'headband'],
        connectivity: ['wireless'],
        'connecting interface': ['3.5mm', '2.5mm', 'micro usb', 'tf card'],
        application: ['DJ', 'sport', 'running', 'gaming']
    }
}
//карта отмеченных фильтров
export const check_list = (() => {
    let list = {};
    for (let cat in categories){
        const elem = categories[cat];
        let cont = {data: {}, isChecked: false}
        for (let icat in elem){
            const ielem = elem[icat];
            let icont = {};
            for (let itm = 0; itm < ielem.length; itm++){
                icont[icat === 'brand' ? ielem[itm].name : ielem[itm]] = false;
            }
            cont.data[icat] = icont;
        }
        list[cat] = cont;
    }  
    for (let c in list){
        list[c].isChecked = true;
        break;
    }       
    return list;
})();