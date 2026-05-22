import express from "express"
import cors from "cors"
import morgan from "morgan"
import { AppDataSource } from "./db"
import { SetRoute } from "./routes/set.route"
import { CardRoute } from "./routes/card.route"

const app = express()

app.use(cors())
app.use(morgan("combined"))

app.use(express.static('public'))

app.use('/api/set', SetRoute)
app.use('/api/card', CardRoute)

AppDataSource.initialize().then(() => {
    console.log("Connected to database")
    app.listen(3300, () => {
        console.log("App started")
    })
})