import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { IdCard } from "./IdCard"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    // 想在 user 里访问 idCard 通过第二个参数告诉 typeorm，外键是另一个 Entity 的哪个属性
    @OneToOne(() => IdCard, idCard => idCard.user)
    idCard: IdCard

}
