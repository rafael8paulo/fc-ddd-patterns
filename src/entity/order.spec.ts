import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {


    it("should throw error when id is empty", () => {

        expect(() => {
            const order = new Order("", "123", []);
        }).toThrowError("Id is required");

    });


    it("should throw error when customerId is empty", () => {
        expect(() => {
            const order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });


    it("should throw error when items are empty", () => {
        expect(() => {
            const order = new Order("123", "123", []);
        }).toThrowError("Items are required");
    });

    it("should calculate the total", () => {

        const item = new OrderItem("i1", "Item 1", 100, 1, "p1");
        const order = new Order("o1", "c1", [item]);
        expect(order.total()).toBe(100);

        const item2 = new OrderItem("i2", "Item 2", 200, 1, "p2");
        const order2 = new Order("o2", "c2", [ item, item2]);
        expect(order2.total()).toBe(300);

    });


    it("should throw if the item qtd is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("i1", "Item 1", 100, 0, "p1");
            const order = new Order("o1", "c1", [item]);
            order.total();
        }).toThrowError("Quantity must be greater than 0");
    })

});