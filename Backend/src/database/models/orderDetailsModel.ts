import { Table, DataType, Column, Model, Validate } from "sequelize-typescript"

@Table({
    tableName: "order_details",
    timestamps: true,
    modelName: "OrderDetails"
})


class OrderDetails extends Model{
    @Column({
        primaryKey: true,
        type:DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type:DataType.INTEGER,
        allowNull: false
    })
    declare quantity: number
}


export default OrderDetails