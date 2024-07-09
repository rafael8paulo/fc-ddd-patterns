import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "products", timestamps: false })
export default class ProductModel extends Model {

    @PrimaryKey
    @Column
    declare id: String;

    @Column({allowNull: false})
    declare name: String;

    @Column({allowNull: false})
    declare price: Number;

}