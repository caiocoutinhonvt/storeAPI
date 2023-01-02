import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Cart } from "./Cart"

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text'})
    email: string
    
    @Column({type: 'text'})
    password: string

    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[]


    constructor(i:number, n:string, e:string, p:string, carts:Cart[]){
        this.id = i
        this.name = n
        this.email = e
        this.password = p
        this.carts = carts
    }
}