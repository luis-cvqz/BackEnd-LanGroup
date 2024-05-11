const express = require('express')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Backend de LanGroup escuchando en el puerto: ${process.env.SERVER_PORT}`)
})