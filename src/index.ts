import express from "express"
import cors from "cors"
import morgan from "morgan"
import { AppDataSource } from "./db"
import { SetService } from "./services/set.service"

const app = express()

app.use(cors())
app.use(morgan("combined"))

app.use(express.static('public'))

app.get('/api/sets', async (req, res) => {
    const name = String(req.query.name)
    const skip = Number(req.query.offset) || 0

    res.json(await SetService.getSets(name, skip))
})

app.get('/api/set/:set_code', async (req, res) => {
    const set_code = String(req.params.set_code)

    res.json(await SetService.getSetDetails(set_code))
})

AppDataSource.initialize().then(() => {
    console.log("Connected to database")
    app.listen(3300, () => {
        console.log("App started")
    })
})