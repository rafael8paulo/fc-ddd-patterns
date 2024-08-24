import { v4 as uuid } from 'uuid'
import OrderFactory from './order.factory';

describe("Order factory unit tests", () => {

    it("should create a new order", () => {
        const orderProps = {
            id: uuid(),
            customerId: "123",
            items: [
                { id: uuid(), name: "Product A", productId: uuid(), price: 10, quantity: 2 },
                { id: uuid(), name: "Product B", productId: uuid(), price: 20, quantity: 1 }
            ]
        }

        const order = OrderFactory.create(orderProps);
        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(2);

    })


});