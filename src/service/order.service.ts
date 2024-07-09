import Order from "../entity/order";

export default class OrderService {

    static total(orders: Order[]): number {
        return orders.reduce((total, order) => total + order.total(), 0);
    }

}