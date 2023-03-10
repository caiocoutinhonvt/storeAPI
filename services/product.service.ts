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
                image:"string",
                store: "number"
            },

            async handler(ctx:any): Promise<Product|Error>{ 
                try {
                    const newProduct:Product = productRepository.create({
                        'name': ctx.params.name, 
                        'category':ctx.params.category, 
                        'price': ctx.params.price,
                        'image': ctx.params.image,
                        'store': ctx.params.store,
                    })

                    await productRepository.save(newProduct)

                    ctx.meta = { $statusCode: 201 };
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
                    ctx.meta = { $statusCode: 200 };
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
                    const product = productRepository.find({
                        where:{'id': id},
                        relations: ['store']
                    }
                )
                    ctx.meta = { $statusCode: 200 };
                    return product
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
                image:"string",
                store: "number"
            },

            async handler(ctx:any): Promise<void|Error>{
                const { id } = ctx.params

                try{
                    const product = await productRepository.findOneBy({id: id})

                    if (product != null){
                        product.name = ctx.params.name
                        product.category = ctx.params.category
                        product.price = ctx.params.price
                        product.image = ctx.params.image
                        product.store = ctx.params.store

                        await productRepository.save(product)
                        ctx.meta = { $statusCode: 204 };
                    }
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
                    ctx.meta = { $statusCode: 204 };
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },
    }
}


export default ProductService;