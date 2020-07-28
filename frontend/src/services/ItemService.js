import axios from 'axios';

const url = 'http://localhost:5000/api/items/';

class itemService {
    // Get Items in main db
    static async getItems(){
        const response = await axios.get(url);
        return response;
    }

    static async getItembyId(){
        const response = await axios.get(`${url}${item_id}`);
        return response;
    }

    static insertItem(name, description){
        return axios.post(url, {
            name,
            description,
        })
    }

    static updateItem(item_id, description) {
        return axios.put(`${url}${item_id}`, {
            description
        })
    }
}

export default itemService;
