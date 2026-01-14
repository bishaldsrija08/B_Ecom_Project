import { Table, DataType, Column, Model, Validate, AllowNull } from "sequelize-typescript"
import { PaymentMethod, PaymentStatus } from "../../globals/types"

@Table({
    tableName: "payment",
    timestamps: true,
    modelName: "Payment"
})

class Payment extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.ENUM(PaymentMethod.Khalti, PaymentMethod.Esewa, PaymentMethod.COD),
        allowNull: false,
        defaultValue: PaymentMethod.COD
    })
    declare paymentMethod: string

    @Column({
        type: DataType.ENUM(PaymentStatus.Paid, PaymentStatus.Unpaid),
        allowNull: false,
        defaultValue: PaymentStatus.Unpaid
    })
    declare paymentStatus: string

    @Column({
        type: DataType.STRING
    })
    declare pidx: string

}

export default Payment