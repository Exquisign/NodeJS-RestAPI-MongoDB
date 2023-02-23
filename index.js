require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const port = 3000;
const mongoData = process.env.DATABASE_URL;
const app = express()
app.use(express.json())

mongoose.connect(mongoData)
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', ()=> {
    console.log('Database Connected')
})

mongoose.set('strictQuery', false)

const routes = require('./routes/routes')

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

