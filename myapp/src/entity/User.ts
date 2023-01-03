import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { Cart } from "./Cart"
import bcrypt from 'bcryptjs'

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column({type: 'text'})
    name: string

    @Column({type: 'text', unique: true})
    email: string
    
    @Column({type: 'text'})
    password: string

    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[]

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        console.log(this.password)
        this.password = bcrypt.hashSync(this.password, 8)
        
    }


    constructor(i:number, n:string, e:string, p:string, carts:Cart[]){
        this.id = i
        this.name = n
        this.email = e
        this.password = p
        this.carts = carts
    }
}