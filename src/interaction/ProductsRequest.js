


export default {
    getProducts(check_list){
        return new Promise((resolve, reject) => {
            resolve([
                {
                    brand: 'hp',
                    model: 'probook 4540s',
                    parameters: {
                        ram: '16gb',
                        display: '15.4',
                        cpu: 'inter core i7',
                        gpu: 'nVidia 1080 gtx'
                    },
                    price: '130$'
                }
            ]);
            // распарсить check_list
            // запрос к серверу
        })
    }
}