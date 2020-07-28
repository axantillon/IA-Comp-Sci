import axios from 'axios';

const url = 'http://localhost:5000/api/archive/';

class ItemService {
    // Get Items
    static async getItems(week_id){
        const response = await axios.get(`${url}${week_id}`);
        return response;
    }

    static insertItem(week_id, item_id, item_name, amount_needed){
        return axios.post(`${url}${week_id}`, {
            item_id,
            item_name,
            amount_needed,
        })
    }

    static updateItem(week_id, entry_id, user_id, amount_volunteer) {
        return axios.put(`${url}${week_id}/${entry_id}`, {
            user_id,
            amount_volunteer
        })
    }
}

export default ItemService;
