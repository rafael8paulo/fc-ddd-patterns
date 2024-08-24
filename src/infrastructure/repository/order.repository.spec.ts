import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_item";
import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/value-object/Address";
import Product from "../../domain/product/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepository from "./order.repository";


describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, 2, product.id);

        const order = new Order("123", "123", [orderItem])

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);


        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id,
            },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });

    })

    it("should update order", async () => {
        const orderRepository = new OrderRepository();
        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();

        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const product = new Product("123", "Product 1", 10);
        productRepository.create(product);
        const orderItem = new OrderItem("1", product.name, product.price, 2, product.id);
        const order = new Order("123", "123", [orderItem])
        await orderRepository.create(order);

        const orderItem2 = new OrderItem("2", product.name, product.price, 1, product.id);
        order.items.push(orderItem2);
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id,
            },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });

    });

    it("should find by id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, 2, product.id);

        const order = new Order("123", "123", [orderItem])

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);


        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id,
            },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });

        const orderFind = await orderRepository.find(order.id);

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderFind.id,
            customer_id: orderFind.customerId,
            total: orderFind.items.reduce((acc, item) => acc + item.orderItemTotal(), 0),
            items: [
                {
                    id: orderFind.items[0].id,
                    name: orderFind.items[0].name,
                    price: orderFind.items[0].price,
                    quantity: orderFind.items[0].quantity,
                    order_id: orderFind.id,
                    product_id: orderFind.items[0].productId,
                },
            ],
        });

    });

    it("should find all", async () => {

        const customerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const product = new Product("123", "Product 1", 10);
        productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, 2, product.id);
        const orderItem2 = new OrderItem("2", product.name, product.price, 1, product.id);

        const order = new Order("123", "123", [orderItem, orderItem2])
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id,
            },
            include: ["items"]
        });

        const orderFind = await orderRepository.findAll();

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderFind[0].id,
            customer_id: orderFind[0].customerId,
            total: orderFind[0].items.reduce((sum, item) => sum + item.orderItemTotal(), 0),
            items: [
                {
                    id: orderFind[0].items[0].id,
                    name: orderFind[0].items[0].name,
                    price: orderFind[0].items[0].price,
                    quantity: orderFind[0].items[0].quantity,
                    order_id: orderFind[0].id,
                    product_id: orderFind[0].items[0].productId,
                },
                {
                    id: orderFind[0].items[1].id,
                    name: orderFind[0].items[1].name,
                    price: orderFind[0].items[1].price,
                    quantity: orderFind[0].items[1].quantity,
                    order_id: orderFind[0].id,
                    product_id: orderFind[0].items[1].productId,
                },
            ],
        });

    });

});