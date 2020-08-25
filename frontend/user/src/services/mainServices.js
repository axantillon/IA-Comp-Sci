import axios from "axios";
import { getAccessToken } from "./auth";

const root_url = "https://user-ia-comp-sci.herokuapp.com/api"

export class weekService {
  static url = root_url + "/weeks/";

  //Get all weeks
  static async getWeeks() {
    const response = await axios.get(this.url, {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    });
    return response;
  }

  //Add user as volunteer for a given week
  static async addUserVolunteer(week_id, name, email) {
    return axios.put(
      `${this.url}${week_id}/volunteers`,
      {
        name,
        email
      },
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` }
      }
    )
  }
}

export class archiveWeekService {
  static url = root_url + "/archive/";

  // Get Items for Week
  static async getWeekItems(week_id) {
    const response = await axios.get(`${this.url}${week_id}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` }
    });
    return response;
  }

  static updateWeekItem(week_id, entry_id, user_email, amount_volunteer) {
    return axios.put(
      `${this.url}${week_id}/${entry_id}`,
      {
        user_email,
        amount_volunteer
      },
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` }
      }
    );
  }
}
