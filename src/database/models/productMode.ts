import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "products",
    modelName: "Product",
    timestamps: true
})

class Product extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare productName: string

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare productDescription: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare productPrice: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare productStockQty: number;

    @Column({
        type: DataType.STRING,
        defaultValue: "https://img.drz.lazcdn.com/static/np/p/ef9b416822c382528a620eb605feece7.jpg_720x720q80.jpg_.webp"
    })
    declare productImageUrl: string;

    @Column({
        type: DataType.INTEGER
    })
    declare productDiscountPercent: number
}


export default Product;