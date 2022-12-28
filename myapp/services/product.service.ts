import { AppDataSource } from "../src/data-source"
import { Product } from "../src/entity/Product"

const ProductService = {
    name: 'ProductService',
    actions: {
        newProduct:{
            rest:"POST /products/new",
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
                } catch(err) {
                    console.log(err.message)
                }
            }
        },

        listProduct:{
            rest:"GET /products/",
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(Product) 

                try{
                    const listProducts = repository.find({})
                    ctx.params.$statusCode = 200
                    return listProducts

                } catch(err) {
                    console.log(err.message)
                }
            }
        },

        getProduct:{
            rest:"GET /products/:id",
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(Product) 
                const { id } = ctx.params

                try{
                    const products = repository.find({where:{'id': id}})
                    ctx.params.$statusCode = 200
                    return products
                } catch(err) {
                    console.log(err.message)
                }
            }
        },

        updateProduct:{
            rest:"PUT /products/:id",
            auth: "required",
            params:{
                name: "string",
                category: "string",
                price: "number|positive:true",
                store: "number"
            },

            async handler(ctx:any): Promise<any>{
                const { id } = ctx.params
                const repository = AppDataSource.getRepository(Product) 

                try{
                    const product = await repository
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
                } catch(err) {
                    console.log(err.message)
                }
            }
        },

        delProduct:{
            rest:"DELETE /products/:id",

            async handler(ctx:any): Promise<any>{
                const { id } = ctx.params
                const repository = AppDataSource.getRepository(Product) 

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


export default ProductService;