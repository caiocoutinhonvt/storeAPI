import { Column } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

export class Cart {

    @Column()
    user: User
    @Column()
    product: Product

    constructor(u:User, p:Product){
        this.user = u
        this.product = p
    }
}