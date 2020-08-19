import axios from 'axios';
import { getAccessToken } from './auth';


export class itemService {

    static url = 'http://localhost:5000/api/items/';

    static updateItem(item_id, description) {
        return axios.put(`${this.url}${item_id}`, {
            description,
        },
        {
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        }
        )
    }
}

export class weekService {
    static url = 'http://localhost:5000/api/weeks/'

    //Get all weeks
    static async getWeeks(){
        const response = await axios.get(this.url, {
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        });
        return response;
    }
}

export class archiveWeekService {
    static url = 'http://localhost:5000/api/archive/';

    // Get Items for Week
    static async getWeekItems(week_id){
        const response = await axios.get(`${this.url}${week_id}`, {
            headers: { Authorization: `Bearer ${getAccessToken()}`}
        });
        return response;
    }

    static updateWeekItem(week_id, entry_id, user_email, amount_volunteer) {
        return axios.put(`${this.url}${week_id}/${entry_id}`, {
            user_email,
            amount_volunteer,
        }, 
        { 
            headers: { Authorization: `Bearer ${getAccessToken()}`},
        })
    }
}
