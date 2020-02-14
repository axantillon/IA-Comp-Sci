import axios from 'axios';

const url = 'http://localhost:5000/api/items/';

class ItemService {
    // Get Items
    static async getItems(){
        const response = await axios.get(url);
        return response;
    }

    static insertItem(name, quantity){
        return axios.post(url, {
            name,
            quantity,
        })
    }
}

export default ItemService;
