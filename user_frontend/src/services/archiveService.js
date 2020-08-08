import axios from 'axios';

export class archiveWeekService {
    static url = 'http://localhost:5000/api/archive/';

    // Get Items for Week
    static async getWeekItems(week_id){
        const response = await axios.get(`${this.url}${week_id}`);
        return response;
    }

    static insertWeekItem(week_id, item_id, item_name, amount_needed){
        return axios.post(`${this.url}${week_id}`, {
            item_id,
            item_name,
            amount_needed,
        })
    }

    static updateWeekItem(week_id, entry_id, user_id, amount_volunteer) {
        return axios.put(`${this.url}${week_id}/${entry_id}`, {
            user_id,
            amount_volunteer
        })
    }
}
