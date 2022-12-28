import { AppDataSource } from "../src/data-source"
import { User } from "../src/entity/User"

const UserService = {
    name: 'UserService',
    actions:{
        newUser:{
            rest:"POST /user/new",
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
                } catch(err) {
                    console.log(err.message)
                }
            }
        },

        listUser:{
            rest:"GET /user/",
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(User) 

                try{
                    const listUsers = repository.find({})
                    ctx.params.$statusCode = 200
                    return listUsers
                } catch(err) {
                    console.log(err.message)
                }
            }
        },
        
        getUser:{
            rest:"GET /user/:id",
            async handler(ctx:any): Promise<any>{
                const repository = AppDataSource.getRepository(User) 
                const { id } = ctx.params

                try{
                    const user = repository.find({where:{'id': id}})
                    ctx.params.$statusCode = 200
                    return user
                } catch(err) {
                    console.log(err.message)
                }
            }
        },

        updateUser:{
            params:{
                name:'string',
                email: {type: "email"},
                password:'string|min:5'
            },
            rest:"PUT /user/:id",

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
                } catch(err) {
                    console.log(err.message)
                }
            }
        },

        delUser:{
            auth: "required",
            rest:"DELETE /user/:id",
            async handler(ctx:any): Promise<any>{
                const { id } = ctx.params
                const repository = AppDataSource.getRepository(User) 
                
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

export default UserService;

