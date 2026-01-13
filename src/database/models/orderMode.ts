import { Table, DataType, Column, Model, Validate } from "sequelize-typescript"

@Table({
    tableName: "orders",
    timestamps: true,
    modelName: "Order"
})

class Order extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 10],
                msg: "Phone number must be 10 digits long"
            }
        }
    })
    declare phoneNumber: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare shippingAddress: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    declare totalAmoung: number

    @Column({
        type: DataType.ENUM("Pending", "Shipped", "Delivered", "Cancelled", "On the way", "Returned"),
        allowNull: false
    })

}