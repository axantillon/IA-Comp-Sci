import axios from "axios";
import { getAccessToken } from "./auth";

const root_url = "https://admin-ia-comp-sci.herokuapp.com/api"

export class archiveWeekService {
  static url = root_url + "/archive/";

  // Get Items for Week
  static async getWeekItems(week_id) {
    const response = await axios.get(`${this.url}${week_id}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    });
    return response;
  }

  static insertWeekItem(week_id, item_id, amount_needed) {
    return axios.post(
      `${this.url}${week_id}`, 
      {
      item_id,
      amount_needed,
      }, 
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` }
      }
    );
  }
}

export class itemService {
  static url = root_url + "/items/";

  // Get Items in main db
  static async getItems() {
    const response = await axios.get(this.url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    });
    return response;
  }

  static async getItembyId(item_id) {
    const response = await axios.get(`${this.url}${item_id}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    });
    return response;
  }

  static insertItem(name, description) {
    return axios.post(
      this.url, 
      {
        name,
        description,
      },
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` }
      }
    );
  }
}

export class weekService {
  static url = root_url + "/weeks/";

  //Get all weeks
  static async getWeeks() {
    const response = await axios.get(this.url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    });
    return response;
  }

  //Add New Week Archive
  static async addWeek(week_id) {
    return axios.post(`${this.url}${week_id}`, null, {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    });
  }
}
