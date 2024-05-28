const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cors
var corsOptions = {
    origin: ["http://localhost:3001", "http://localhost:8080"],
    methods: "GET, PUT, POST, DELETE"
}
app.use(cors(corsOptions))

app.use("/api/publicaciones", require("./routes/publicaciones.routes"))
app.use("/api/archivosmultimedia", require("./routes/archivmosmultimedia.routes"))
app.use("/api/idiomas", require("./routes/idiomas.routes"))
app.use("/api/solicitudes", require("./routes/solicitudes.routes"))
app.get('*', (req,res) => { res.status(404).send() })

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Backend de LanGroup escuchando en el puerto: ${process.env.SERVER_PORT}`)
})