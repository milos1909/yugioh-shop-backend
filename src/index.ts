import express from "express"
import cors from "cors"
import morgan from "morgan"

const app = express()
app.use(cors())
app.use(morgan("combined"))

app.use(express.static('public'))

app.get('/', (req,res) => {
    res.send("Test")
})

app.listen(3300, () => {
    console.log("App started")
})