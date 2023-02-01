import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"


@Entity('stores')
export class Store {
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'text'})
    name: string
    @Column({type: 'text'})
    website: string

    @OneToMany(() => Product, (product) => product.store)
    products: Product[]

    constructor(i:number, n:string, w:string, p:Product[]){
        this.id = i
        this.name = n
        this.website = w
        this.products = p
    }

}