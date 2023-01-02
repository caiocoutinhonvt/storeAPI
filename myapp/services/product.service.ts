import { Repository } from "typeorm"
import { AppDataSource } from "../src/data-source"
import { Product } from "../src/entity/Product"
import { Error } from "../src/error/Error"


const productRepository:Repository<Product> = AppDataSource.getRepository(Product)

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

            async handler(ctx:any): Promise<Product|Error>{ 
                

                try {
                    const newProduct:Product = productRepository.create({
                        'name': ctx.params.name, 
                        'category':ctx.params.category, 
                        'price': ctx.params.price,
                        'store': ctx.params.store,
                    })

                    await productRepository.save(newProduct)

                    ctx.meta.$statusCode = 201

                    return newProduct
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },

        listProduct:{
            rest:"GET /products/",
            async handler(ctx:any): Promise<Product[]|Error>{


                try{
                    const listProducts = productRepository.find({})
                    ctx.meta.$statusCode = 200
                    return listProducts

                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },

        getProduct:{
            rest:"GET /products/:id",
            async handler(ctx:any): Promise<Product[]|Error>{
                const { id } = ctx.params

                try{
                    const products = productRepository.find({where:{'id': id}})
                    ctx.meta.$statusCode = 200
                    return products
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },

        updateProduct:{
            rest:"PUT /products/:id",
            params:{
                name: "string",
                category: "string",
                price: "number|positive:true",
                store: "number"
            },

            async handler(ctx:any): Promise<void|Error>{
                const { id } = ctx.params

                try{
                    const product = await productRepository
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

                    ctx.meta.$statusCode = 204
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },

        delProduct:{
            rest:"DELETE /products/:id",

            async handler(ctx:any): Promise<void|Error>{
                const { id } = ctx.params

                try{
                    await productRepository.delete({'id': id})
                    ctx.meta.$statusCode = 204
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },
    }
}


export default ProductService;