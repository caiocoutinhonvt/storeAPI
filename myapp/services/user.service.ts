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
                } catch(error) {
                    console.log(error)
                }
            }
        },

        listUser:{
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(User) 

                try{
                    const listUsers = repository.find({})
                    ctx.params.$statusCode = 200
                    return listUsers
                } catch(error) {
                    console.log(error)
                }
            }
        },
        
        getUser:{
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(User) 
                const { id } = ctx.params

                try{
                    const user = repository.find({where:{'id': id}})
                    ctx.params.$statusCode = 200
                    return user
                } catch(error) {
                    console.log(error)
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
                    const user = await repository
                    .createQueryBuilder()
                    .update(User)
                    .set({ 
                        'name': ctx.params.name, 
                        'email':ctx.params.email, 
                        'password': ctx.params.password
                    })
                    .where({id: id})
                    .execute()

                    ctx.params.$statusCode = 204
                } catch(error) {
                    console.log(error)
                }
            }
        },

        delUser:{
            async handler(ctx:any): Promise<any>{
                const { id } = ctx.params
                const repository = AppDataSource.getRepository(User) 
                
                try{
                    await repository.delete({'id': id})
                    ctx.params.$statusCode = 204 
                } catch(error) {
                    console.log(error)
                }          
            }
        },
    }
}

export default UserService;

