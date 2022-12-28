import { AppDataSource } from "../src/data-source"
import { User } from "../src/entity/User"

const UserService = {
    name: 'UserService',
    actions:{
        newUser:{
            params:{
                name:'string',
                email: {type: "email"},
                password:'string|min:5'
            },

            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(User)

                try {
                    const newUser = repository.create({ 
                        'name': ctx.params.name, 
                        'email':ctx.params.email, 
                        'password': ctx.params.password
                    })
                    await repository.save(newUser)
                    ctx.params.$statusCode = 200
                    return newUser
                } catch {
                    ctx.params.$statusCode = 404
                }
            }
        },

        listUser:{
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(User) 

                try{
                    const listProducts = repository.find({})
                    ctx.params.$statusCode = 200
                    return listProducts

                } catch {
                    ctx.params.$statusCode = 404
                }
            }
        },
        
        getUser:{
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(User) 
                const { id } = ctx.params

                try{
                    const listProducts = repository.find({
                        where:{
                            'id': id
                        }
                    })
                    ctx.params.$statusCode = 200
                    return listProducts

                } catch {
                    ctx.params.$statusCode = 404
                }
            }
        },

        

        updateUser:{
            params:{
                name:'string',
                email: {type: "email"},
                password:'string|min:5'
            },

            async handler(ctx:any): Promise<any>{
                const { id } = ctx.params
                const repository = AppDataSource.getRepository(User) 

                try{
                    const store = await repository
                    .createQueryBuilder()
                    .update(User)
                    .set({ 
                        'name': ctx.params.name, 
                        'email':ctx.params.email, 
                        'password': ctx.params.password
                    })
                    .where({id: id})
                    .execute()

                    ctx.params.$statusCode = 200
                    return `User successfully updated` 
                } catch {
                    ctx.params.$statusCode = 204
                }
                }
        },
        delUser:{
            async handler(ctx:any): Promise<any>{
                const { id } = ctx.params
                const repository = AppDataSource.getRepository(User) 
                
                try{
                    await repository.delete({'id': id})
                    ctx.params.$statusCode = 200
                    return `User successfully deleted` 
                } catch {
                    ctx.params.$statusCode = 204
                }             
            }
        }
        }
    }

export default UserService;

