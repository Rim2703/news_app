const express = require('express')
require('dotenv').config()
const route = require('./route')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000; // Use 5000 as default if not set

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(port, () => {
    console.log("Server Successfully Started!")
})