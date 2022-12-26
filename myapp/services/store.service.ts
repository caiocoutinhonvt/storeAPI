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
                name: "string"
            },

            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(Store)
                const newStore = repository.create({'name': ctx.params.name})
                await repository.save(newStore)
                return newStore
            },
        },

        listStore:{
            handler(ctx:any): any{
                 const repository = AppDataSource.getRepository(Store) 
                 const listStore = repository.find({})
                 return listStore
            },
        },

        delStore:{
            params:{
                id: "string"
            },

            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(Store) 

                await repository.delete({'id': ctx.params.id})
                
                return `A loja com id ${ctx.params.id} foi deletada` 
            }
        },

        updateStore:{
            params:{
                name: "string"
            },

            async handler(this, ctx:any, id:number): Promise<any>{
                const repository = AppDataSource.getRepository(Store) 
                
                const store = await repository
                                .createQueryBuilder()
                                .update(Store)
                                .set({ name: ctx.params.name})
                                .where({id: id})
                                .execute()
                
                return `A loja com id ${ctx.params.id} foi atualizada`
                }
            },
        },
       
    }
export default StoreService;




