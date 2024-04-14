import axios from "axios";

export interface IClient {
  name: string;
  phone: string;
  address: string;
  email: string;
}

const URL = process.env.REACT_APP_API_URL + "/";

export class Api {
  static async getClients() {
    return await axios.get(URL + "clients");
  }

  static async getOrders() {
    return await axios.get(URL + "orders");
  }

  static async getServices() {
    return await axios.get(URL + "services");
  }

  static async getCoupons() {
    return await axios.get(URL + "coupons");
  }

  static async createClient(client: IClient) {
    await axios.post(URL + "client", {
      client_name: client.name,
      client_address: client.address,
      client_phone: client.phone,
      client_email: client.email,
    });
  }
}
