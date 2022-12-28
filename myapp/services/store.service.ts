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
                    return newStore
                } catch {
                    ctx.params.$statusCode = 404
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

                } catch {
                    ctx.params.$statusCode = 404
                }
            },
        },

        getStore:{
            async handler(ctx:any): Promise<any>{
                const { id } = ctx.params
                const repository = AppDataSource.getRepository(Store) 

                try{
                    const listStore = repository.find({
                        where:{
                            id: id
                        },
                        relations: {
                            products: true,
                    }
                })
                    ctx.params.$statusCode = 200
                    return listStore

                } catch {
                    ctx.params.$statusCode = 404
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

                    ctx.params.$statusCode = 200
                    return `Store successfully updated`
                } catch {
                    ctx.params.$statusCode = 204
                }
                }
            },
            
        delStore:{
                async handler(ctx:any): Promise<any>{
                    const { id } = ctx.params
                    const repository = AppDataSource.getRepository(Store) 
    
                    try{
                        await repository.delete({'id': id})
                        ctx.params.$statusCode = 200 
                    } catch {
                        ctx.params.$statusCode = 204
                    }             
                }
            },
        
       
    }
}
export default StoreService;




