import { Table, Column, Model, DataType } from "sequelize-typescript";
import { UserRole } from "../../middlewares/isAuthenticate";

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
        type: DataType.ENUM(UserRole.Admin, UserRole.Customer),
        defaultValue: UserRole.Customer
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