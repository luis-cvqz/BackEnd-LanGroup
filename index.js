<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
=======
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
>>>>>>> 9d08e43ca400d117782a0d59f0db01f955ef2bf9

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:8080"],
  methods: "GET,PUT, POST, DELETE",
};
app.use(cors(corsOptions));

app.use("/api/grupos", require("./routes/grupos.routes"));
app.get("*", (req, res) => {
  res.status(404).send();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
var corsOptions = {
    origin: ["http://localhost:3001", "http://localhost:8080"],
    methods: "GET,PUT,POST,DELETE",
};

app.use(cors(corsOptions));

// Rutas
app.use("/api/publicaciones", require("./routes/publicaciones.routes"))
app.use("/api/archivosmultimedia", require("./routes/archivmosmultimedia.routes"))
app.use("/api/idiomas", require("./routes/idiomas.routes"))
app.use("/api/solicitudes", require("./routes/solicitudes.routes"))
app.use("/api/colaboradores", require('./routes/colaboradores.routes'))
app.use("/api/auth", require('./routes/auth.routes'))
app.use("/api/interacciones", require('./routes/interacciones.routes'))
app.use("/api/roles", require("./routes/roles.routes"))
app.get('*', (req, res) => { res.status(404).send() });

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Backend de LanGroup escuchando en el puerto: ${process.env.SERVER_PORT}`
  );
});
