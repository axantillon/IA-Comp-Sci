import axios from 'axios';
import { getAccessToken } from './auth';

export class archiveWeekService {
    static url = 'http://localhost:3000/api/archive/';

    // Get Items for Week
    static async getWeekItems(week_id){
        const response = await axios.get(`${this.url}${week_id}`, 
                                        {headers: { Authorization: `Bearer ${getAccessToken()}`}});
        return response;
    }

    static insertWeekItem(week_id, item_id, amount_needed){
        return axios.post(`${this.url}${week_id}`, {
            item_id,
            amount_needed,
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        })
    }

    static updateWeekItem(week_id, entry_id, user_id, amount_volunteer) {
        return axios.put(`${this.url}${week_id}/${entry_id}`, {
            user_id,
            amount_volunteer,
        },
        {
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        })
    }
}

export class itemService {

    static url = 'http://localhost:3000/api/items/';

    // Get Items in main db
    static async getItems(){
        const response = await axios.get(this.url, {
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        });
        return response;
    }

    static async getItembyId(item_id){
        const response = await axios.get(`${this.url}${item_id}`, {
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        });
        return response;
    }

    static insertItem(name, description){
        return axios.post(this.url, {
            name,
            description,
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        })
    }

    static updateItem(item_id, description) {
        return axios.put(`${this.url}${item_id}`, {
            description,
        },
        {
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        })
    }
}

export class weekService {
    static url = 'http://localhost:3000/api/weeks/'

    //Get all weeks
    static async getWeeks(){
        const response = await axios.get(this.url, {
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        });
        return response;
    }

    //Add New Week Archive
    static async addWeek(week_id) {
        return axios.post(`${this.url}${week_id}`,{
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        })
    }
}

// export class userService {
//     static url = 'https://dev-kialml3c.us.auth0.com/api/v2/users/'

//     static async getUserbyID(id_token){
//         const response = await axios.get(this.url + `?q=`)
//     }
// }
