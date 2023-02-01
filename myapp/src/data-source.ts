import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from 'typeorm'

const port = process.env.DB_PORT as unknown as number

export const AppDataSource = new DataSource({
	type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entity/*.ts`],
    migrations: [`${__dirname}/**/migrations/*.ts`]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })