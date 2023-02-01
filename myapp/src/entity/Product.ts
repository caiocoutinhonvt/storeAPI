import { type } from "os"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cart } from "./Cart"
import { Store } from "./Store"


@Entity('products')
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'text'})
    name: string

    @Column({type:'text'})
    category: string

    @Column({type:'int'})
    price: number

    @Column({type:'text'})
    image: string

    @ManyToOne(() => Store, (store) => store.products)
    @JoinColumn({name:'store_id'})
    store: Store

    @OneToMany(() => Cart, (cart) => cart.product)
    carts: Cart[]


    constructor(i:number,n:string,c:string,p:number, img:string, s:Store, carts:Cart[]){
        this.id = i,
        this.name = n,
        this.category = c
        this.price = p
        this.image = img
        this.store = s
        this.carts = carts
    }
}