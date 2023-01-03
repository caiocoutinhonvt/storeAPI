import { Repository } from "typeorm"
import { AppDataSource } from "../src/data-source"
import { User } from "../src/entity/User"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const userRepository:Repository<User> = AppDataSource.getRepository(User)

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

            async handler(ctx:any): Promise<User|Error>{
                

                try {
                    const newUser = userRepository.create({ 
                        'name': ctx.params.name, 
                        'email':ctx.params.email, 
                        'password': ctx.params.password
                    })
                    await userRepository.save(newUser)
                    ctx.meta.$statusCode = 200
                    return newUser
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },


        loginUser:{
            params:{
                email: {type: "email"},
                password:'string|min:5'
            },

            async handler(ctx:any): Promise<any>{
                const user:any = await userRepository.findOne({where:{email: ctx.params.email}})

                if (!user){
                    ctx.meta.$statusCode = 401
                }

                const isValidPassword = await bcrypt.compare(ctx.params.password, user.password)

                if (!isValidPassword){
                    ctx.meta.$statusCode = 401
                } 

                const token = jwt.sign({id: user.id, name: user.name, email: user.email}, 'secret', {expiresIn: '1d'});

                return ({
                    user: user,
                    token: token
                })
            }
        },
        listUser:{
            rest:"GET /user/",
            async handler(ctx:any): Promise<User[]|Error>{
                try{
                    const listUsers = userRepository.find({})
                    ctx.meta.$statusCode = 200
                    return listUsers
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },
        
        getUser:{
            rest:"GET /user/:id",
            async handler(ctx:any): Promise<User[]|Error>{
                const { id } = ctx.params

                try{
                    const user = userRepository.find({where:{'id': id}})
                    ctx.meta.$statusCode = 200
                    return user
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
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

            async handler(ctx:any): Promise<void|Error>{
                const { id } = ctx.params

                try{
                    const user = await userRepository.findOneBy({id: id})

                    if (user != null){
                        user.name = ctx.params.name
                        user.email = ctx.params.email
                        user.password = ctx.params.password

                        await userRepository.save(user)
                        ctx.meta.$statusCode = 204
                    }
                    
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }
            }
        },

        delUser:{
            rest:"DELETE /user/:id",
            async handler(ctx:any): Promise<void|Error>{
                const { id } = ctx.params
                
                try{
                    await userRepository.delete({'id': id})
                    ctx.meta.$statusCode = 204 
                } catch(err) {
                    console.log(err.message)
                    return new Error(err.message)
                }      
            }
        },
    }
}

export default UserService;

