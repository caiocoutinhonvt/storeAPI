"use strict"
import { create } from "domain"
import "reflect-metadata"
import { Repository } from "typeorm"
import { errorHandler } from "../moleculer.config"
import { Store } from '../src/entity/Store'
import { AppDataSource } from '/home/pc/Desktop/node-estudo/StoreAPI/myapp/src/data-source'


const storeRepository:Repository<Store> = AppDataSource.getRepository(Store)

const StoreService = {
    name:'StoreService',
    actions: {
        newStore:{
            rest:"POST /store/new",
            params:{
                name: "string",
                email: {type: "email"},
            },

            async handler(ctx:any): Promise<Store|Error>{
                try {
                    const newStore = storeRepository.create({'name': ctx.params.name, 'email':ctx.params.email})
                    await storeRepository.save(newStore)
                    ctx.meta.$statusCode = 201
                    return newStore
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },

        listStore:{
            rest:"GET /store/",
            async handler(ctx:any): Promise<Store[]|Error>{
                try{
                    const listStore = storeRepository.find({ 
                        relations: {
                            products: true,
                    }
                })
                    ctx.meta.$statusCode = 200
                    return listStore

                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            },
        },

        getStore:{
            rest:"GET /store/:id",
            async handler(ctx:any): Promise<Promise<Store[]|Error>>{
                const { id } = ctx.params

                try{
                    const store = storeRepository.find({
                        where:{
                            id: id
                        },
                        relations: {
                            products: true,
                    }
                })
                    ctx.meta.$statusCode = 200
                    return store

                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
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

            async handler(ctx:any): Promise<void|Error>{
                const { id } = ctx.params

                try{
                    const store = await storeRepository.findOneBy({id: id})

                    if (store != null){
                        store.name = ctx.params.name
                        store.email = ctx.params.email

                        await storeRepository.save(store)
                        ctx.meta.$statusCode = 204
                    }
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
                }
            },

        delStore:{
            rest:"DELETE /store/:id",
            auth: "required",
                async handler(ctx:any): Promise<void|Error>{
                    const { id } = ctx.params

                    try{
                        await storeRepository.delete({'id': id})
                        ctx.params.$statusCode = 204
                    } catch(err) {
                        console.log(err.message)
                        return new Error(err.message)
                    }     
                }
            },
        
       
    }
}
export default StoreService;




