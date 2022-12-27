import { type } from "os"
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
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

    @ManyToOne(() => Store, (store) => store.products)
    @JoinColumn({name:'store_id'})
    store: Store


    constructor(i:number,n:string,c:string,p:number, s:Store){
        this.id = i,
        this.name = n,
        this.category = c
        this.price = p
        this.store = s
    }
}