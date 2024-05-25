import axios from "axios";

export interface IClient {
  name: string;
  phone: string;
  address: string;
  email: string;
}

export interface ICoupon {
  coupon_name: string;
  coupon_discount: number;
}

export interface IService {
  service_name: string;
  service_price: number;
}

export interface IEmployee {
  employee_name: string;
  employee_position: number | string;
  employee_phone: string;
  employee_email: string;
  employee_address: string;
  employee_passport: string;
  employee_birthday: Date;
  employee_hire_date: Date;
  employee_termination_date: Date | null;
}

export interface IPosition {
  position_name: string;
  position_rate: number;
}

export interface IOrder {
  client_id: number;
  employee_id: number;
  coupon_id: number;
  order_date: Date | null;
}

export interface IOrderComposition {
  order_id: number;
  service_id: number;
  amount_compositions: number;
}

export interface IClientReviews {
  client_id: number;
  order_id: number;
  review_text: string | number;
}

const URL = process.env.REACT_APP_API_URL;

export class Api {
  static async getClients() {
    return await axios.get(URL + "clients");
  }

  static async getPositions() {
    return await axios.get(URL + "positions");
  }

  static async getEmployees() {
    return await axios.get(URL + "employees");
  }

  static async getOrders() {
    return await axios.get(URL + "orders");
  }

  static async getOrdersCompositons() {
    return await axios.get(URL + "order_compositions");
  }

  static async getServices() {
    return await axios.get(URL + "services");
  }

  static async getCoupons() {
    return await axios.get(URL + "coupons");
  }

  static async getReviews() {
    return await axios.get(URL + "client_reviews");
  }

  static async createClient(client: IClient) {
    await axios.post(URL + "clients", {
      client_name: client.name,
      client_address: client.address,
      client_phone: client.phone,
      client_email: client.email,
    });
  }

  static async createCoupon(coupon: ICoupon) {
    await axios.post(URL + "coupon", {
      coupon_name: coupon.coupon_name,
      coupon_discount: coupon.coupon_discount,
    });
  }

  static async createService(service: IService) {
    await axios.post(URL + "services", {
      service_name: service.service_name,
      service_price: service.service_price,
    });
  }

  static async createEmployee(employee: IEmployee) {
    await axios.post(URL + "employees", {
      employee_name: employee.employee_name,
      employee_position: employee.employee_position,
      employee_phone: employee.employee_phone,
      employee_email: employee.employee_email,
      employee_address: employee.employee_address,
      employee_passport: employee.employee_passport,
      employee_birthday: employee.employee_birthday,
      employee_hire_date: employee.employee_hire_date,
      employee_termination_date: employee.employee_termination_date,
    });
  }
  static async createPosition(position: IPosition) {
    await axios.post(URL + "positions", {
      position_name: position.position_name,
      position_rate: position.position_rate,
    });
  }

  static async createOrder(order: IOrder) {
    await axios.post(URL + "orders", {
      client_id: order.client_id,
      employee_id: order.employee_id,
      coupon_id: order.coupon_id,
      order_date: order.order_date,
    });
  }

  static async createOrderComposition(orderComposition: IOrderComposition) {
    await axios.post(URL + "order_compositions", {
      order_id: orderComposition.order_id,
      service_id: orderComposition.service_id,
      amount_compositions: orderComposition.amount_compositions,
    });
  }

  static async createReview(review: IClientReviews) {
    await axios.post(URL + "client_reviews", {
      client_id: review.client_id,
      order_id: review.order_id,
      review_text: review.review_text,
    });
  }

  static async completeOrder(id: number) {
    await axios.post(URL + "complete_order", {
      order_id: id,
    });
  }
}
