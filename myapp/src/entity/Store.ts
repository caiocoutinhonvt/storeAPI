import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"


@Entity('stores')
export class Store {
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'text'})
    name: string
    @Column({type: 'text'})
    email: string

    @OneToMany(() => Product, (product) => product.store)
    products: Product[]

    constructor(i:number, n:string, e:string, p:Product[]){
        this.id = i
        this.name = n
        this.email = e
        this.products = p
    }

}