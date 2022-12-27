import { AppDataSource } from "../src/data-source"
import { Product } from "../src/entity/Product"

const ProductService = {
    name: 'ProductService',
    actions: {
        newProduct:{
            params:{
                name: "string",
                category: "string",
                price: "number|positive:true",
                store: "number"
            },

            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(Product)

                try {
                    const newProduct = repository.create({
                        'name': ctx.params.name, 
                        'category':ctx.params.category, 
                        'price': ctx.params.price,
                        'store': ctx.params.store,
                    })
                    await repository.save(newProduct)
                    ctx.params.$statusCode = 201
                    return newProduct
                } catch {
                    ctx.params.$statusCode = 500 // 5XX
                }
            }
        },
        listProduct:{
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(Product) 

                try{
                    const listProducts = repository.find({})
                    ctx.params.$statusCode = 200
                    return listProducts

                } catch {
                    ctx.params.$statusCode = 500 // 5XX
                }
            }
        },

        updateProduct:{
            params:{
                name: "string",
                category: "string",
                price: "number|positive:true",
                store: "number"
            },

            async handler(ctx:any, id:number): Promise<any>{
                const repository = AppDataSource.getRepository(Product) 

                try{
                    const store = await repository
                    .createQueryBuilder()
                    .update(ProductService)
                    .set({ 
                        'name': ctx.params.name, 
                        'category':ctx.params.category, 
                        'price': ctx.params.price,
                        'store': ctx.params.store,
                    })
                    .where({id: id})
                    .execute()

                    ctx.params.$statusCode = 204
                } catch {
                    ctx.params.$statusCode = 500 // 5XX
                }
                }
            },

        delProduct:{
            async handler(ctx:any, id:number): Promise<any>{
                const repository = AppDataSource.getRepository(Product) 

                try{
                    await repository.delete({'id': id})
                    ctx.params.$statusCode = 204
                } catch {
                    ctx.params.$statusCode = 500 // 5XX
                }             
            }
        },
    }
}


export default ProductService;