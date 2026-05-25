import express from "express"
import cors from "cors"
import morgan from "morgan"
import { AppDataSource } from "./db"
import { SetRoute } from "./routes/set.route"
import { CardRoute } from "./routes/card.route"
import { configDotenv } from "dotenv"
import { UserRouter } from "./routes/user.route"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("combined"))

app.use(express.static('public'))

app.use('/api/set', SetRoute)
app.use('/api/card', CardRoute)
app.use('/api/user', UserRouter)

configDotenv()

const port = Number(process.env.SERVER_PORT)

AppDataSource.initialize().then(() => {
    console.log("Connected to database")
    app.listen(port, () => {
        console.log(`App started on port ${port}`)

    })
})