import express from "express"
import cors from "cors"
import morgan from "morgan"
import { DataSource, Like } from "typeorm"
import { Set } from "./entities/Set"
import { report } from "process"

const app = express()
app.use(cors())
app.use(morgan("combined"))

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'yugioh_shop',
    entities: [Set]
})

app.use(express.static('public'))

app.get('/sets', async (req, res) => {
    const skip = Number(req.query.offset) || 0
    const name = String(req.query.name)

    const repo = AppDataSource.getRepository(Set)

    const [sets, total] = await repo.findAndCount({
        where: name ? {
            set_name: Like(`%${name}%`)
        } : {},
        order: {
            tcg_date: 'DESC'
        },
        take: 18,
        skip
    })

    res.json({
        sets,
        total
    })
})

AppDataSource.initialize().then(() => {
    console.log("Connected to database")
    app.listen(3300, () => {
        console.log("App started")
    })
})