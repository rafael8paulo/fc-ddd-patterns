import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }
    async update(entity: Order): Promise<void> {

        await OrderModel.sequelize.transaction(async (t) => {

            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t
            })

            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId,
                order_id: entity.id
            }));

            await OrderItemModel.bulkCreate(items, { transaction: t });

            await OrderModel.update(
                { total: entity.total() },
                { where: { id: entity.id } }
            );

        });

    }

    async find(id: string): Promise<Order> {
        const o = await OrderModel.findOne({ where: { id: id }, include: ["items"] });

        let items: OrderItem[] = [];

        for (let item of o.items) {
            items.push(
                new OrderItem(
                    item.id as string,
                    item.name as string,
                    item.price as number,
                    item.quantity as number,
                    item.product_id as string
                ))
        }

        return new Order(o.id as string, o.customer_id as string, items);

    }
    async findAll(): Promise<Order[]> {
        const os = await OrderModel.findAll({ include: ["items"] });

        const orders: Order[] = os.map((o) => {
            const orderItems: OrderItem[] = o.items.map((item: any) =>
                new OrderItem(
                    item.id as string,
                    item.name as string,
                    item.price as number,
                    item.quantity as number,
                    item.product_id as string
                )
            );

            return new Order(o.id, o.customer_id, orderItems);

        });

        return orders;

    }

}