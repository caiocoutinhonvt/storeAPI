import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.carts)
    @JoinColumn({name:'user_id'})
    user: User

    @ManyToOne(() => Product, (product) => product.carts)
    @JoinColumn({name:'product_id'})
    product: Product

    constructor(id:number ,u:User, p:Product){
        this.id = id
        this.user = u
        this.product = p
    
    }
}