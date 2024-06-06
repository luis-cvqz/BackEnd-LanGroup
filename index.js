const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
var corsOptions = {
  origin: ['http://localhost:3001', 'http://localhost:8080'],
  methods: 'GET,PUT,POST,DELETE',
};
app.use(cors(corsOptions));

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Bitacora
app.use(require("./middlewares/bitacora.middleware"))

// Rutas
app.use("/api/publicaciones", require("./routes/publicaciones.routes"))
app.use("/api/archivosmultimedia", require("./routes/archivmosmultimedia.routes"))
app.use("/api/idiomas", require("./routes/idiomas.routes"))
app.use("/api/solicitudes", require("./routes/solicitudes.routes"))
app.use("/api/colaboradores", require('./routes/colaboradores.routes'))
app.use("/api/auth", require('./routes/auth.routes'))
app.use("/api/interacciones", require('./routes/interacciones.routes'))
app.use("/api/roles", require("./routes/roles.routes"))
app.use("/api/grupos", require("./routes/grupos.routes"))
app.use("/api/email", require("./routes/email.routes"))
app.use("/api/bitacora", require("./routes/bitacora.routes"))
app.get('*', (req, res) => { res.status(404).send() })

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Backend de LanGroup escuchando en el puerto: ${process.env.SERVER_PORT}`)
})

// -- GRPC -- //

const { 
    subirVideoImpl, 
    descargarVideoImpl, 
    subirConstanciaImpl, 
    descargarConstanciaImpl 
} = require('./gRPC/implementacionesGRPC.js')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = './proto/archivos.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const archivosProto = grpc.loadPackageDefinition(packageDefinition)

// Inicializa el servidor gRPC
const grpcServer = new grpc.Server()
grpcServer.addService(archivosProto.ArchivosService.service, {
    subirVideo: subirVideoImpl,
    descargarVideo: descargarVideoImpl,
    subirConstancia: subirConstanciaImpl,
    descargarConstancia: descargarConstanciaImpl
})

grpcServer.bindAsync(`localhost:${process.env.GRPC_PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Servidor gRPC en ejecucion en el puerto: ${process.env.GRPC_PORT}`)
})