import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderFactory {


    public static create(orderProps: OrderFactoryProps): Order {

        const items = orderProps.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.quantity, item.productId)
        });

        return new Order(orderProps.id, orderProps.customerId, items);;
    }

}

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string,
        name: string,
        productId: string,
        price: number,
        quantity: number
    }[];
}