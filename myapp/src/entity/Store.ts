import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity('stores')
export class Store {
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'text'})
    name: string

    constructor(i:number, n:string){
        this.id = i
        this.name = n
    }

}