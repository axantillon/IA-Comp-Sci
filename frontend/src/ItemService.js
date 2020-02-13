import axios from 'axios';

const url = 'http://localhost:5000/api/items/';

class ItemService {
    // Get Items
    static async getItems(){
        const response = await axios.get(url);
        response.data.createdAt = new Date(response.data.createdAt)
        return response;
    }
}

export default ItemService;
