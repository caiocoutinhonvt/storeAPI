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
            rest:"POST /store/new",
            params:{
                name: "string",
                email: {type: "email"},
            },

            async handler(ctx:any): Promise<Store | undefined>{
                const repository = AppDataSource.getRepository(Store)

                try {
                    const newStore = repository.create({'name': ctx.params.name, 'email':ctx.params.email})
                    await repository.save(newStore)
                    ctx.params.$statusCode = 201
                    return newStore
                } catch(err) {
                    console.log(err.message)
                }
            }
        },

        listStore:{
            rest:"GET /store/",
            async handler(ctx:any): Promise<Store[] | undefined>{
                const repository = AppDataSource.getRepository(Store) 

                try{
                    const listStore = repository.find({ 
                        relations: {
                            products: true,
                    }
                })
                    ctx.params.$statusCode = 200
                    return listStore

                } catch(err) {
                    console.log(err.message)
                }
            },
        },

        getStore:{
            rest:"GET /store/:id",
            async handler(ctx:any): Promise<Promise<Store[] | undefined>>{
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

                } catch(err) {
                    console.log(err.message)
                }
            },
        },

        updateStore:{
            rest:"PUT /store/:id",
            auth: "required",
            params:{
                name: "string",
                email: {type: "email"},
            },

            async handler(ctx:any): Promise<void>{
                const { id } = ctx.params
                const repository = AppDataSource.getRepository(Store) 

                try{
                    const store = await repository
                    .createQueryBuilder()
                    .update(Store)
                    .set({ name: ctx.params.name})
                    .where({id: id})
                    .execute()

                    ctx.params.$statusCode = 204
                } catch(err) {
                    console.log(err.message)
                }
                }
            },

        delStore:{
            rest:"DELETE /store/:id",
            auth: "required",
                async handler(ctx:any): Promise<void>{
                    const { id } = ctx.params
                    const repository = AppDataSource.getRepository(Store) 
    
                    try{
                        await repository.delete({'id': id})
                        ctx.params.$statusCode = 204
                    } catch(err) {
                        console.log(err.message)
                    }       
                }
            },
        
       
    }
}
export default StoreService;




