"use strict"
import { create } from "domain"
import "reflect-metadata"
import { errorHandler } from "../moleculer.config"
import { Store } from '../src/entity/Store'
import { AppDataSource } from '/home/pc/Desktop/node-estudo/StoreAPI/myapp/src/data-source'



const StoreService = {
    name:'StoreService',
    actions: {
        newStore:{
            params:{
                name: "string",
                email: {type: "email"},
            },

            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(Store)

                try {
                    const newStore = repository.create({'name': ctx.params.name, 'email':ctx.params.email})
                    await repository.save(newStore)
                    ctx.params.$statusCode = 201
                    return newStore
                } catch(error) {
                    console.log(error)
                }
            }
        },

        listStore:{
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(Store) 

                try{
                    const listStore = repository.find({ 
                        relations: {
                            products: true,
                    }
                })
                    ctx.params.$statusCode = 200
                    return listStore

                } catch(error) {
                    console.log(error)
                    ctx.params.$statusCode = 500 
                }
            },
        },

        getStore:{
            async handler(ctx:any): Promise<any>{
                const { id } = ctx.params
                const repository = AppDataSource.getRepository(Store) 

                try{
                    const store = repository.find({
                        where:{
                            id: id
                        },
                        relations: {
                            products: true,
                    }
                })
                    ctx.params.$statusCode = 200
                    return store

                } catch(error) {
                    console.log(error)
                }
            },
        },

        updateStore:{
            params:{
                name: "string",
                email: {type: "email"},
            },

            async handler(ctx:any, id:number): Promise<any>{
                const repository = AppDataSource.getRepository(Store) 

                try{
                    const store = await repository
                    .createQueryBuilder()
                    .update(Store)
                    .set({ name: ctx.params.name})
                    .where({id: id})
                    .execute()

                    ctx.params.$statusCode = 204
                    return `Store successfully updated`
                } catch(error) {
                    console.log(error)
                }
                }
            },

        delStore:{
                async handler(ctx:any): Promise<any>{
                    const { id } = ctx.params
                    const repository = AppDataSource.getRepository(Store) 
    
                    try{
                        await repository.delete({'id': id})
                        ctx.params.$statusCode = 204
                    } catch(error) {
                        console.log(error)
                    }        
                }
            },
        
       
    }
}
export default StoreService;




