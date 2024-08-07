import Product from "../../domain/entity/product";
import ProductRespositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRespositoryInterface {

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }
    async update(entity: Product): Promise<void> {

        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price,
            },
            {
                where: {
                    id: entity.id,
                },
            }
        );

    }
    async find(id: string): Promise<Product> {
        const p = await ProductModel.findOne({ where: { id } });
        return new Product(p.id as string, p.name as string, p.price as number);
    }
    async findAll(): Promise<Product[]> {
        const ps = await ProductModel.findAll();
        return ps.map((p) => new Product(p.id as string, p.name as string, p.price as number));
    }

}