import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

    constructor(i:number, n:string, e:string, p:string){
        this.id = i
        this.name = n
        this.email = e
        this.password = p
    }
}