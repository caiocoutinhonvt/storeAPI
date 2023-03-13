import { AppDataSource } from "../src/data-source"
import { Cart } from "../src/entity/Cart"

const cartRepository = AppDataSource.getRepository(Cart)

const CartService = {
    name: 'CartService',
    actions:{
        newCart: {
            params:{
                product:'number'
            },

            async handler(ctx:any): Promise<any>{ 
                try {
                    const newCart = cartRepository.create({
                        'user': ctx.meta.user.id,
                        'product': ctx.params.product
                    })

                    await cartRepository.save(newCart)

                    const cart = cartRepository.find({
                        where:{
                            user: {
                                id: ctx.meta.user.id
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

                    ctx.meta = { $statusCode: 201 };
                    return cart
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }


        },

        UserCart: {
            async handler(ctx:any): Promise<any>{ 
                try {

                    const findCart = await cartRepository.find({
                        where:{
                            user: ctx.meta.user.id
                        },
                        relations:{
                            product: true
                        }
                    })

                    ctx.meta = { $statusCode: 200 };
                    return findCart
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },
        
        delCart: {
            async handler(ctx:any): Promise<any>{ 
                const { id } = ctx.params
                
                try{
                    const cart = await cartRepository.delete({
                        'id': id
                    }
                )
                    if (cart == null){
                        ctx.meta = { $statusCode: 401 };
                    } else {
                        ctx.meta = { $statusCode: 204 };
                    }
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        }
    }
}

export default CartService;
