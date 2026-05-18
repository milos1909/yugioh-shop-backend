import { DataSource } from "typeorm";
import { Set } from "./entities/Set";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'yugioh_shop',
    entities: [Set]
})