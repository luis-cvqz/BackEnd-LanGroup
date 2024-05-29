const { archivomultimedia, solicitud, Sequelize } = require('../models')
/* 
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const dotenv = require('dotenv')
*/
const fs = require('fs')

// const PROTO_PATH = './proto/archivos.proto'
const UPLOADS_PATH = '../uploads/'

/* 
const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const archivosProto = grpc.loadPackageDefinition(packageDefinition) 
*/

/*
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
*/

// Implementacion de subirVideo
function subirVideoImpl(call, callback) {
  let nombreVideo, archivoid, chunk
  let tempFilePath
  let video

  call.on('archivo', async (DescargarArchivoResponse) => {
    if (DescargarArchivoResponse.archivoid) {
      archivoid = DescargarArchivoResponse.archivoid
      nombreVideo = DescargarArchivoResponse.nombre
      tempFilePath = `./uploads/${nombreVideo}`
      console.debug(`Recibiendo el video ${nombreVideo}`)
    } 
    else if (DescargarArchivoResponse.archivo) {
      chunk = DescargarArchivoResponse.archivo
      fs.appendFileSync(tempFilePath, chunk)
      process.stdout.write('.')
    }
  }).on('end', function() {
    callback(null, { nombre: nombreVideo })
    console.log('\nEnvio de datos terminado.')

    video = fs.readFileSync(UPLOADS_PATH + nombreVideo)
    fs.existsSync(UPLOADS_PATH + nombreVideo) && fs.unlinkSync(UPLOADS_PATH + nombreVideo)

    archivomultimedia.update({
      archivo: video
    }, { where: { id: archivoid } })
  })
}

// Implementacion de descargarVideo
function descargarVideoImpl(call) {}

// Implementeacion de subirConstancia
function subirConstanciaImpl(call, callback) {
  let nombreConstancia, constanciaid, chunk
  let tempFilePath
  let documento

  call.on('archivo', async (DescargarArchivoResponse) => {
    if (DescargarArchivoResponse.archivoid) {
      constanciaid = DescargarArchivoResponse.archivoid
      nombreConstancia = DescargarArchivoResponse.nombre
      tempFilePath = `./uploads/${nombreConstancia}`
      console.debug(`Recibiendo el documento ${nombreConstancia}`)
    } else if (DescargarArchivoResponse.archivo) {
      chunk = DescargarArchivoResponse.archivo
      fs.appendFileSync(tempFilePath, chunk)
      process.stdout.write('.')
    }
  }).on('end', function() {
    callback(null, { nombre: nombreConstancia })
    console.log('\nEnvio de datos terminado.')

    documento = fs.readFileSync(UPLOADS_PATH + nombreConstancia)
    fs.existsSync(UPLOADS_PATH + nombreConstancia) && fs.unlinkSync(UPLOADS_PATH + nombreConstancia)
    
    solicitud.update({
      constacia: documento
    }, { where: { id: constanciaid } })
  })
}

// Implementacion de descargarConstancia
function descargarConstanciaImpl(call) {}

// Exporta las implementaciones de las funciones
module.exports = {
  subirVideoImpl,
  descargarVideoImpl,
  subirConstanciaImpl,
  descargarConstanciaImpl
}