import axios from 'axios';


export class itemService {

    static url = 'http://localhost:5000/api/items/';

    // Get Items in main db
    static async getItems(){
        const response = await axios.get(this.url);
        return response;
    }

    static async getItembyId(item_id){
        const response = await axios.get(`${this.url}${item_id}`);
        return response;
    }

    static insertItem(name, description){
        return axios.post(this.url, {
            name,
            description,
        })
    }

    static updateItem(item_id, description) {
        return axios.put(`${this.url}${item_id}`, {
            description
        })
    }
}

export class weekService {
    static url = 'http://localhost:5000/api/weeks/'

    //Get all weeks
    static async getWeeks(){
        const response = await axios.get(this.url);
        return response;
    }

    //Add New Week Archive
    static async addWeek(week_id) {
        return axios.post(`${this.url}${week_id}`)
    }
}
