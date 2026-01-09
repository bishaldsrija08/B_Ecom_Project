import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "users",
    modelName: "User",
    timestamps: true
})

class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare id: string

    @Column({
        type: DataType.STRING
    })
    declare username: string

    @Column({
        type: DataType.STRING
    })
    declare userEmail: string

    @Column({
        type: DataType.STRING
    })
    declare userPassword: string

    @Column({
        type: DataType.ENUM("admin", "customer"),
        defaultValue: "customer"
    })
    declare userRole: string

    @Column({
        type: DataType.STRING
    })
    declare otp: string

    @Column({
        type: DataType.STRING
    })
    declare otpGeneratedTime: string
}


export default User;