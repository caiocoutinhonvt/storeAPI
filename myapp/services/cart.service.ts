import { DEFAULT_ECDH_CURVE } from "tls"
import { Repository } from "typeorm"
import { AppDataSource } from "../src/data-source"
import { Cart } from "../src/entity/Cart"
import { Product } from "../src/entity/Product"
import { User } from "../src/entity/User"



const cartRepository = AppDataSource.getRepository(Cart)
const userRepository = AppDataSource.getRepository(User)
const productRepository = AppDataSource.getRepository(Product)



const CartService = {
    name: 'CartService',
    actions:{
        newCart: {
            params:{
                user:'number',
                product:'number'
            },

            async handler(ctx:any): Promise<any>{ 
                try {
                    // const user = userRepository.findBy({ id: ctx.params.user}) 
                    // const product = productRepository.findBy({ id: ctx.params.product}) 

                    const newCart = cartRepository.create({
                        'user': ctx.params.user,
                        'product': ctx.params.product
                    })

                    await cartRepository.save(newCart)

                    const cart = cartRepository.find({
                        where:{
                            user: {
                                id: ctx.params.user
                            },
                            product: {
                                id: ctx.params.product
                            }
                        },
                        relations: {
                            user: true,
                            product:true
                        },
                    })

                    return cart

                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }


        }
    }
}

export default CartService;
